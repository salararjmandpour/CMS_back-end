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

    // save category in database
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

  async update(
    id: string,
    update: CreateCategoryDto,
  ): Promise<ResponseFormat<any>> {
    // prevent duplicate title and name
    const [existCategory, duplicateTitle, duplicateName] = await Promise.all([
      this.categoriesRepository.findById(id),
      this.categoriesRepository.findByTitle(update.title),
      this.categoriesRepository.findByName(update.name),
    ]);
    if (!existCategory) {
      throw new BadRequestException(ResponseMessages.CATEGORY_NOT_FOUND);
    }
    if (duplicateTitle) {
      throw new BadRequestException(ResponseMessages.TITLE_ALREADY_EXIST);
    }
    if (duplicateName) {
      throw new BadRequestException(ResponseMessages.NAME_ALREADY_EXIST);
    }

    // update category by id
    const category = await this.categoriesRepository.updateById(id, update, {
      new: true,
    });
    if (!category) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_CATEGORY,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        category,
      },
    };
  }

  async deleteById(id: string): Promise<ResponseFormat<any>> {
    // check exist category
    const existCategory = await this.categoriesRepository.findById(id);
    if (!existCategory) {
      throw new BadRequestException(ResponseMessages.CATEGORY_NOT_FOUND);
    }

    // delete category by id
    const deletedResult = await this.categoriesRepository.deleteById(id);
    if (deletedResult.deletedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_CATEGORY,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.CATEGORY_DELETED,
    };
  }
}
