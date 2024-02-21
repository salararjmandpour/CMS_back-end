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

import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { AddToGalleryInput } from '../gallery/interfaces/add-to-gallery.interface';
import { PublicSettingsRepository } from '../settings/repositories/public-settings.repository';

export enum TypeQueryEnum {
  PRODUCT = 'product',
  POST = 'post',
  ALL = 'all',
}

@Injectable()
export class CategoriesService {
  constructor(
    private fileService: FileService,
    private seoRepository: SeoRepository,
    private galleryRepositoy: GalleryRepository,
    private categoriesRepository: CategoriesRepository,
    private publicSettingsRepository: PublicSettingsRepository,
  ) {}

  async create(
    userId: string,
    body: CreateCategoryWithSeoDto,
  ): Promise<ResponseFormat<any>> {
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
    const createdCategory = await this.categoriesRepository.create({
      ...body.category,
      supplier: userId,
    });
    if (!createdCategory) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_CATEGORY,
      );
    }

    // set url
    const publicSettings = await this.publicSettingsRepository.findAll();
    const clientDomain: string = publicSettings[0].siteAddress;
    const updatedResult = await this.categoriesRepository.updateById(
      createdCategory._id.toString(),
      {
        idUrl: `${clientDomain}/categories/${createdCategory._id}`,
        slugUrl: `${clientDomain}/categories/${body.category.slug}`,
      },
    );
    console.log(updatedResult);

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

    // update url
    if (body.category.slug) {
      const publicSettings = await this.publicSettingsRepository.findAll();
      const clientDomain: string = publicSettings[0].siteAddress;
      await this.categoriesRepository.updateById(id, {
        slugUrl: `${clientDomain}/categories/${body.category.slug}`,
      });
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

    const deletedSeoResult = await this.seoRepository.deleteManyByIds(
      categoriesIds,
    );

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.CATEGORIES_DELETED,
    };
  }

  async getCategoryList(
    type: TypeQueryEnum,
    search: string | undefined,
  ): Promise<ResponseFormat<any>> {
    const [seos, hasWithoutCategoryProduct, hasWithoutCategoryPost] =
      await Promise.all([
        this.seoRepository.findWithCategory(),
        this.categoriesRepository.findByProductWithoutCategory(),
        this.categoriesRepository.findByPostWithoutCategory(),
      ]);

    if (!seos) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_SEO_LIST,
      );
    }
    if (!hasWithoutCategoryProduct) {
      await this.categoriesRepository.createProductWithoutCategory();
    }
    if (!hasWithoutCategoryPost) {
      await this.categoriesRepository.createPostWithoutCategory();
    }

    let query: any = {};
    if (type === TypeQueryEnum.POST) query.type = TypeQueryEnum.POST;
    if (type === TypeQueryEnum.PRODUCT) query.type = TypeQueryEnum.PRODUCT;
    if (search) query.title = { $regex: search, $options: 'i' };

    const categories = await this.categoriesRepository.findAll(query);
    if (!categories) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_CATEGORY_LIST,
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
      } as AddToGalleryInput);

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
