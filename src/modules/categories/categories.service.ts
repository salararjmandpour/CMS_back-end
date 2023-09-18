import {
  HttpStatus,
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { FileService } from '../file/file.service';
import { CategoriesRepository } from './categories.repository';

import { CreateCategoryDto } from './dtos/create-category.dto';
import { CustomException } from 'src/core/utils/custom-exception.util';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class CategoriesService {
  constructor(
    private fileService: FileService,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async create(
    file: Express.Multer.File,
    body: CreateCategoryDto,
  ): Promise<ResponseFormat<any>> {
    try {
      // check exist file
      if (!file) {
        throw new BadRequestException(ResponseMessages.FILE_IS_REQUIRED);
      }
      const image = file?.path?.replace(/\\/g, '/');

      // prevent duplicate title and slug
      const [duplicateTitle, duplicateSlug, existParent] = await Promise.all([
        this.categoriesRepository.findByTitle(body.title),
        this.categoriesRepository.findByName(body.slug),
        this.categoriesRepository.findById(body.parent),
      ]);
      if (duplicateTitle) {
        throw new ConflictException(ResponseMessages.TITLE_ALREADY_EXIST);
      }
      if (duplicateSlug) {
        throw new ConflictException(ResponseMessages.SLUG_ALREADY_EXIST);
      }
      if (body.parent && !existParent) {
        throw new NotFoundException(ResponseMessages.PARENT_CATEGORY_NOT_FOUND);
      }

      // save category in database
      const category = await this.categoriesRepository.create({
        ...body,
        image,
      });
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
    } catch (error) {
      const path = file?.path?.replace(/\\/g, '/');
      this.fileService.deleteFileByPath(path);
      throw new CustomException(error.message, error.status);
    }
  }

  async update(
    id: string,
    update: CreateCategoryDto,
    file: Express.Multer.File,
  ): Promise<ResponseFormat<any>> {
    try {
      // prevent duplicate title and name
      const [existCategory, duplicateTitle, duplicateSlug] = await Promise.all([
        this.categoriesRepository.findById(id),
        this.categoriesRepository.findByTitle(update.title),
        this.categoriesRepository.findByName(update.slug),
      ]);
      if (!existCategory) {
        throw new NotFoundException(ResponseMessages.CATEGORY_NOT_FOUND);
      }
      if (duplicateTitle) {
        throw new ConflictException(ResponseMessages.TITLE_ALREADY_EXIST);
      }
      if (duplicateSlug) {
        throw new ConflictException(ResponseMessages.SLUG_ALREADY_EXIST);
      }

      if (file) {
        const image = file?.path?.replace(/\\/g, '/');
        update.image = image;

        // delete prevent image in file system
        this.fileService.deleteFileByPath(existCategory.image);
        console.log({ prevImage: existCategory.image });
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
    } catch (error) {
      const path = file?.path?.replace(/\\/g, '/');
      console.log({ path });
      this.fileService.deleteFileByPath(path);
      throw new CustomException(error.message, error.status);
    }
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

    // delete category image in file system
    this.fileService.deleteFileByPath(existCategory.image);

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.CATEGORY_DELETED,
    };
  }

  async getCategoryList(): Promise<ResponseFormat<any>> {
    const categories = await this.categoriesRepository.findAll();

    if (!categories) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_CATEGORY_LIST,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        categories,
      },
    };
  }
}
