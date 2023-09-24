import {
  HttpStatus,
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { SeoService } from '../seo/seo.service';
import { FileService } from '../file/file.service';
import { CategoriesRepository } from './categories.repository';

import {
  CreateCategoryDto,
  CreateCategoryWithSeoDto,
} from './dtos/create-category.dto';
import { copyObject } from 'src/core/utils/copy-object';
import { CustomException } from 'src/core/utils/custom-exception.util';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { SeoRepository } from '../seo/seo.repository';
import { CategoryDocument } from './schemas/category.schema';
import { SeoDocument } from '../seo/schemas/seo.schema';

@Injectable()
export class CategoriesService {
  constructor(
    private seoService: SeoService,
    private fileService: FileService,
    private categoriesRepository: CategoriesRepository,
    private seoRepository: SeoRepository,
  ) {}

  async create(body: CreateCategoryWithSeoDto): Promise<ResponseFormat<any>> {
    // prevent duplicate title and slug
    const [duplicateTitle, duplicateSlug, existParent, duplicatedSeoSlug] =
      await Promise.all([
        this.categoriesRepository.findByTitle(body.category.title),
        this.categoriesRepository.findBySlug(body.category.slug),
        this.categoriesRepository.findById(body.category.parent),
        this.seoRepository.findBySlug(body?.seo?.slug),
      ]);
    if (duplicateTitle) {
      throw new ConflictException(
        ResponseMessages.CATEGORY_TITLE_ALREADY_EXIST,
      );
    }
    if (duplicateSlug) {
      throw new ConflictException(ResponseMessages.CATEGORY_SLUG_ALREADY_EXIST);
    }
    if (body.category.parent && !existParent) {
      throw new NotFoundException(ResponseMessages.PARENT_CATEGORY_NOT_FOUND);
    }
    if (body.seo && duplicatedSeoSlug) {
      throw new ConflictException(ResponseMessages.SEO_SLUG_ALREADY_EXIST);
    }

    // save category in database
    const createdCategory = await this.categoriesRepository.create(
      body.category,
    );
    if (!createdCategory) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_CATEGORY,
      );
    }

    // save seo in database
    if (body.seo) {
      const createdSeo = await this.seoService.create({
        ...body.seo,
        category: createdCategory._id.toString(),
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: ResponseMessages.CATEGORY_CREATED_SUCCESS,
        data: {
          category: createdCategory,
          seo: createdSeo.data.seo,
        },
      };
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.CATEGORY_CREATED_SUCCESS,
      data: {
        category: createdCategory,
      },
    };
  }

  async update(
    id: string,
    body: CreateCategoryWithSeoDto,
  ): Promise<ResponseFormat<any>> {
    // prevent duplicate title and name
    const [
      existCategory,
      duplicateTitle,
      duplicateSlug,
      existParent,
      duplicatedSeoSlug,
    ] = await Promise.all([
      this.categoriesRepository.findById(id),
      this.categoriesRepository.findByTitle(body?.category?.title),
      this.categoriesRepository.findBySlug(body?.category?.slug),
      this.categoriesRepository.findById(body.category.parent),
      this.seoRepository.findBySlug(body?.seo?.slug),
    ]);
    if (!existCategory) {
      throw new NotFoundException(ResponseMessages.CATEGORY_NOT_FOUND);
    }
    if (duplicateTitle) {
      throw new ConflictException(
        ResponseMessages.CATEGORY_TITLE_ALREADY_EXIST,
      );
    }
    if (duplicateSlug) {
      throw new ConflictException(ResponseMessages.SLUG_ALREADY_EXIST);
    }
    if (body.category.parent && !existParent) {
      throw new NotFoundException(ResponseMessages.PARENT_CATEGORY_NOT_FOUND);
    }
    if (body?.seo?.slug && duplicatedSeoSlug) {
      throw new ConflictException(ResponseMessages.SEO_SLUG_ALREADY_EXIST);
    }

    // update category by id
    const [updatedCategory, existSeo] = await Promise.all([
      this.categoriesRepository.updateById(id, body.category, {
        new: true,
      }),
      this.seoRepository.findByCategory(existCategory._id.toString()),
    ]);
    if (!updatedCategory) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_CATEGORY,
      );
    }

    // if exist seo, update seo in database
    if (body?.seo) {
      let upsertedSeo;
      if (existSeo) {
        upsertedSeo = await this.seoRepository.updateById(
          existSeo?._id,
          body.seo,
          { new: true },
        );
      } else {
        upsertedSeo = await this.seoRepository.create({
          ...body.seo,
          category: existCategory._id.toString(),
        });
      }

      return {
        statusCode: HttpStatus.OK,
        data: {
          category: updatedCategory,
          seo: upsertedSeo,
        },
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        category: updatedCategory,
      },
    };
  }

  async deleteById(id: string): Promise<ResponseFormat<any>> {
    const [existCategory, deletedResult] = await Promise.all([
      this.categoriesRepository.findById(id),
      this.categoriesRepository.deleteById(id),
      this.seoRepository.deleteOne({ category: id }),
    ]);
    // check exist category
    if (!existCategory) {
      throw new BadRequestException(ResponseMessages.CATEGORY_NOT_FOUND);
    }
    // delete category by id
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

  async getCategoryList(): Promise<ResponseFormat<any>> {
    const [categories, seos] = await Promise.all([
      this.categoriesRepository.findAll(),
      this.seoRepository.findWithCategory(),
    ]);
    if (!categories) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_CATEGORY_LIST,
      );
    }
    if (!seos) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_SEO_LIST,
      );
    }

    const categoryList = categories.map((category: CategoryDocument) => {
      const seo = seos.find((seo: SeoDocument) => {
        return seo?.category?.toString() === category._id.toString();
      });
      return { category, seo };
    });

    return {
      statusCode: HttpStatus.OK,
      data: {
        categories: categoryList,
      },
    };
  }
}
