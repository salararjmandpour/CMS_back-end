import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SeoRepository } from '../seo/seo.repository';
import { SheetsRepository } from './sheets.repository';
import { CreateSheetWithSeoDto } from './dtos/create-sheet.dto';
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
}
