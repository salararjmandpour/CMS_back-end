import {
  HttpStatus,
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import imageSize from 'image-size';

import { FileService } from '../file/file.service';
import { SeoRepository } from '../seo/seo.repository';
import { CategoriesRepository } from './categories.repository';
import { GalleryRepository } from '../gallery/gallery.repository';

import { SeoDocument } from '../seo/schemas/seo.schema';
import { CategoryDocument } from './schemas/category.schema';

import { getTypeFile } from 'src/core/utils/gallery-type-file';
import { CustomException } from 'src/core/utils/custom-exception.util';

import {
  CreateCategoryDto,
  CreateCategoryWithSeoDto,
} from './dtos/create-category.dto';
import { AddToGalleryDto } from '../gallery/dtos/add-to-gallery.dto';

import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class CategoriesService {
  constructor(
    private fileService: FileService,
    private seoRepository: SeoRepository,
    private galleryRepositoy: GalleryRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async create(body: CreateCategoryWithSeoDto): Promise<ResponseFormat<any>> {
    // prevent duplicate title and slug
    const [duplicateTitle, duplicateSlug, existParent] = await Promise.all([
      this.categoriesRepository.findByTitle(body.category.title),
      this.categoriesRepository.findBySlug(body.category.slug),
      this.categoriesRepository.findById(body.category?.parent),
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
      const createdSeo = await this.seoRepository.create({
        ...body.seo,
        category: createdCategory._id.toString(),
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: ResponseMessages.CATEGORY_CREATED_SUCCESS,
        data: {
          category: createdCategory,
          seo: createdSeo,
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
    const [existCategory, duplicateTitle, duplicateSlug, existParent] =
      await Promise.all([
        this.categoriesRepository.findById(id),
        this.categoriesRepository.findByTitle(body?.category?.title),
        this.categoriesRepository.findBySlug(body?.category?.slug),
        this.categoriesRepository.findById(body?.category?.parent),
      ]);
    if (!existCategory) {
      throw new NotFoundException(ResponseMessages.CATEGORY_NOT_FOUND);
    }
    if (duplicateTitle && id !== duplicateTitle._id.toString()) {
      throw new ConflictException(
        ResponseMessages.CATEGORY_TITLE_ALREADY_EXIST,
      );
    }
    if (duplicateSlug && id !== duplicateSlug._id.toString()) {
      throw new ConflictException(ResponseMessages.CATEGORY_SLUG_ALREADY_EXIST);
    }
    if (body.category?.parent && !existParent) {
      throw new NotFoundException(ResponseMessages.PARENT_CATEGORY_NOT_FOUND);
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
      let upsertedSeo: any;
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

  async deleteManyByIds(categoriesIds: string[]): Promise<ResponseFormat<any>> {
    const existCategories = await this.categoriesRepository.findManyByIds(
      categoriesIds,
    );
    // check exist categories by IDs
    if (existCategories.length !== categoriesIds.length) {
      throw new BadRequestException(ResponseMessages.CATEGORIES_NOT_FOUND);
    }

    // delete many categories by ids
    const deletedResult = await this.categoriesRepository.deleteManyByIds(
      categoriesIds,
    );
    if (deletedResult.deletedCount !== categoriesIds.length) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_CATEGORIES,
      );
    }

    console.log(categoriesIds[0]);
    console.log(await this.seoRepository.findById(categoriesIds[0]));
    const deletedSeoResult = await this.seoRepository.deleteManyByIds(
      categoriesIds,
    );
    console.log({ deletedSeoResult });
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.CATEGORIES_DELETED,
    };
  }

  async getCategoryList(
    search: string | undefined,
  ): Promise<ResponseFormat<any>> {
    const [categories, seos] = await Promise.all([
      this.categoriesRepository.findAll(
        search ? { title: { $regex: search, $options: 'i' } } : {},
      ),
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

  async uploadImage(
    userId: string,
    categoryId: string,
    file: Express.Multer.File,
  ): Promise<ResponseFormat<any>> {
    try {
      if (!file) {
        throw new BadRequestException(ResponseMessages.FILE_IS_REQUIRED);
      }

      const path = file?.path?.replace(/\\/g, '/');
      const type = getTypeFile(file.mimetype) as 'image';
      const dimensions = type === 'image' ? imageSize(path) : undefined;
      const size = file.size;

      const [existCategory, updatedResult] = await Promise.all([
        this.categoriesRepository.findById(categoryId),
        this.categoriesRepository.updateById(categoryId, {
          image: path,
        } as CreateCategoryDto),
      ]);
      if (!existCategory) {
        throw new NotFoundException(ResponseMessages.CATEGORY_NOT_FOUND);
      }
      if (!updatedResult) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_UPLOAD_IMAGE,
        );
      }

      await this.galleryRepositoy.create({
        path,
        type,
        size,
        dimensions,
        filename: file.filename,
        mimetype: file.mimetype,
        uploadedBy: userId,
        uploadedIn: userId,
      } as AddToGalleryDto);

      return {
        statusCode: HttpStatus.OK,
        message: ResponseMessages.IMAGE_UPLOADED_SUCCESS,
      };
    } catch (error) {
      if (file) {
        const path = file?.path?.replace(/\\/g, '/');
        this.fileService.deleteFileByPath(path);
      }
      throw new CustomException(error.message, error.status);
    }
  }
}
