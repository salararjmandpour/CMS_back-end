import {
  HttpStatus,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create(body: CreateCategoryDto): Promise<ResponseFormat<any>> {
    // prevent duplicate title and name
    const [duplicateTitle, duplicateName] = await Promise.all([
      this.categoriesRepository.findByTitle(body.title),
      this.categoriesRepository.findByName(body.name),
    ]);
    if (duplicateTitle) {
      throw new BadRequestException(ResponseMessages.TITLE_ALREADY_EXIST);
    }
    if (duplicateName) {
      throw new BadRequestException(ResponseMessages.NAME_ALREADY_EXIST);
    }

    const category = await this.categoriesRepository.create(body);
    if (!category) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_CATEGORY,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        category,
      },
    };
  }
}
