import {
  HttpStatus,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SeoRepository } from '../seo/seo.repository';
import { SheetsRepository } from './sheets.repository';
import { SeoDocument } from '../seo/schemas/seo.schema';
import { CreateSheetWithSeoDto } from './dtos/create-sheet.dto';
import { UpdateSheetWithSeoDto } from './dtos/update-sheet.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { PublicSettingsRepository } from '../settings/repositories/public-settings.repository';

@Injectable()
export class SheetsService {
  constructor(
    private sheetsRepository: SheetsRepository,
    private seoRepository: SeoRepository,
    private publicSettingsRepository: PublicSettingsRepository,
  ) {}

  async create(
    userId: string,
    data: CreateSheetWithSeoDto,
  ): Promise<ResponseFormat<any>> {
    const createdSheet = await this.sheetsRepository.create({
      ...data.sheet,
      writer: userId,
    });

    if (!createdSheet) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_SHEET,
      );
    }

    // create seo
    await this.seoRepository.create({
      ...data.seo,
      sheet: createdSheet._id.toString(),
    });

    // set url
    const publicSettings = await this.publicSettingsRepository.findAll();
    const clientDomain: string = publicSettings[0].siteAddress;
    const updatedResult = await this.sheetsRepository.updateOne(
      createdSheet._id.toString(),
      {
        idUrl: `${clientDomain}/sheets/${createdSheet._id}`,
        slugUrl: `${clientDomain}/sheets/${data.sheet.slug}`,
      },
    );
    console.log(updatedResult);

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.SHEET_CREATED_SUCCESS,
    };
  }

  async update(
    id: string,
    data: UpdateSheetWithSeoDto,
  ): Promise<ResponseFormat<any>> {
    // check exist sheet and update
    const [_, sheet, updatedResult] = await Promise.all([
      this.sheetsRepository.findOneById(id),
      this.sheetsRepository.updateOne(id, data.sheet),
      this.seoRepository.updateBySheetId(id, data.seo || {}),
    ]);
    if (!sheet) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_SHEET);
    }
    if (!updatedResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_SHEET,
      );
    }

    // update url
    if (data.sheet.slug) {
      const publicSettings = await this.publicSettingsRepository.findAll();
      const clientDomain: string = publicSettings[0].siteAddress;
      await this.sheetsRepository.updateOne(id, {
        slugUrl: `${clientDomain}/sheets/${data.sheet.slug}`,
      });
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.SHEET_UPDATED_SUCCESS,
    };
  }

  async findAll(
    status: string,
    search: string,
    startDate: Date,
    endDate: Date,
  ): Promise<ResponseFormat<any>> {
    const query: any = {};
    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: 'i' };
    if (startDate && endDate) {
      query.createdAt = { $gte: startDate, $lt: endDate };
    }

    const [sheets, seos] = await Promise.all([
      this.sheetsRepository.findAll(query),
      this.seoRepository.findAll({ sheet: { $ne: null } }),
    ]);
    if (!sheets || !seos) {
      throw new InternalServerErrorException(
        ResponseMessages.FAIELD_GET_SHEET_LIST,
      );
    }

    const sheetsListWithSeo = sheets.map((sheet: any) => {
      const seo = seos.find((seo: SeoDocument) => {
        return sheet._id.toString() === seo.sheet;
      });
      return { sheet, seo };
    });

    return {
      statusCode: HttpStatus.OK,
      data: { sheets: sheetsListWithSeo },
    };
  }

  async findOneById(id: string): Promise<ResponseFormat<any>> {
    const [_, sheet, seo] = await Promise.all([
      this.sheetsRepository.incrementViewCount(id),
      this.sheetsRepository.findOneById(id),
      this.seoRepository.findBySheet(id),
    ]);
    if (!sheet) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_SHEET);
    }

    return {
      statusCode: HttpStatus.OK,
      data: seo ? { sheet, seo } : { sheet },
    };
  }

  async deleteMany(sheetIDs: string[]): Promise<ResponseFormat<any>> {
    // check exist sheets
    const sheets = await this.sheetsRepository.findManyByIds(sheetIDs);
    if (sheetIDs.length !== sheets.length) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_SHEETS);
    }

    // delete sheets from database
    const manyIds = await this.sheetsRepository.deleteManyByIds(sheetIDs);
    if (manyIds.deletedCount !== sheetIDs.length) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_SHEETS,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.SHEETS_DELETED_SUCCESS,
    };
  }
}
