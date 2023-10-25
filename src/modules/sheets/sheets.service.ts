import {
  HttpStatus,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SeoRepository } from '../seo/seo.repository';
import { SheetsRepository } from './sheets.repository';
import { CreateSheetWithSeoDto } from './dtos/create-sheet.dto';
import { UpdateSheetWithSeoDto } from './dtos/update-sheet.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class SheetsService {
  constructor(
    private sheetsRepository: SheetsRepository,
    private seoRepository: SeoRepository,
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
    const [sheet, updatedResult] = await Promise.all([
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

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.SHEET_UPDATED_SUCCESS,
    };
  }
}
