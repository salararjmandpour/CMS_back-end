import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SeoRepository } from './seo.repository';
import { CreateSeoDto } from './dto/create-seo.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class SeoService {
  constructor(private seoRepository: SeoRepository) {}

  async create(date: CreateSeoDto): Promise<ResponseFormat<any>> {
    const seo = await this.seoRepository.create(date);
    if (!seo) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_SEO,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.SEO_CREATED_SUCCESS,
    };
  }
}
