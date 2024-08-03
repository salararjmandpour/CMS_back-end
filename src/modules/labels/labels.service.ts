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
import { ProductsRepository } from '../products/products.repository';
import { LabelsRepository } from './labels.repository';
import { GalleryRepository } from '../gallery/gallery.repository';

import { SeoDocument } from '../seo/schemas/seo.schema';
import { LabelDocument } from './schemas/label.schema';

import { getTypeFile } from 'src/core/utils/gallery-type-file';
import { CustomException } from 'src/core/utils/custom-exception.util';

import { CreateLabelDto, CreateLabelWithSeoDto } from './dtos/create-label.dto';

import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { AddToGalleryInput } from '../gallery/interfaces/add-to-gallery.interface';
import { PublicSettingsRepository } from '../settings/repositories/public-settings.repository';
import { UpdateLabelWithDto } from './dtos/update-label.dto';
import { PostsRepository } from '../posts/posts.repository';

export enum TypeQueryEnum {
  PRODUCT = 'product',
  POST = 'post',
  ALL = 'all',
}

@Injectable()
export class LabelsService {
  constructor(
    private fileService: FileService,
    private seoRepository: SeoRepository,
    private galleryRepository: GalleryRepository,
    private labelRepository: LabelsRepository,
    private publicSettingsRepository: PublicSettingsRepository,
    private productRepository: ProductsRepository,
    private postRepository: PostsRepository,
  ) {}

  async create(
    userId: string,
    body: CreateLabelWithSeoDto,
  ): Promise<ResponseFormat<any>> {
    // prevent duplicate title and slug
    const [duplicateTitle, duplicateSlug] = await Promise.all([
      this.labelRepository.findByTitle(body.label.name),
      this.labelRepository.findBySlug(body.label.slug),
    ]);
    if (duplicateTitle) {
      throw new ConflictException(ResponseMessages.LABEL_TITLE_ALREADY_EXIST);
    }
    if (duplicateSlug) {
      throw new ConflictException(ResponseMessages.LABEL_SLUG_ALREADY_EXIST);
    }

    // save label in database
    const createdLabel = await this.labelRepository.create({
      ...body.label,
      supplier: userId,
    });
    if (!createdLabel) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_LABEL,
      );
    }

    // set url
    const publicSettings = await this.publicSettingsRepository.findAll();
    const clientDomain: string = publicSettings[0].siteAddress;
    const updatedResult = await this.labelRepository.updateById(
      createdLabel._id.toString(),
      {
        idUrl: `${clientDomain}/labels/${createdLabel._id}`,
        slugUrl: `${clientDomain}/labels/${body.label.slug}`,
      },
    );
    console.log(updatedResult);

    // save seo in database
    if (body.seo) {
      const createdSeo = await this.seoRepository.create({
        ...body.seo,
        label: createdLabel._id.toString(),
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: ResponseMessages.LABEL_CREATED_SUCCESS,
        data: {
          label: createdLabel,
          seo: createdSeo,
        },
      };
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.LABEL_CREATED_SUCCESS,
      data: {
        label: createdLabel,
      },
    };
  }

  async update(
    id: string,
    body: UpdateLabelWithDto,
  ): Promise<ResponseFormat<any>> {
    // prevent duplicate title and name
    const [existLabel, duplicateTitle, duplicateSlug] = await Promise.all([
      this.labelRepository.findById(id),
      this.labelRepository.findByTitle(body?.label?.name),
      this.labelRepository.findBySlug(body?.label?.slug),
    ]);
    if (!existLabel) {
      throw new NotFoundException(ResponseMessages.LABEL_NOT_FOUND);
    }
    if (duplicateTitle && id !== duplicateTitle._id.toString()) {
      throw new ConflictException(ResponseMessages.LABEL_TITLE_ALREADY_EXIST);
    }
    if (duplicateSlug && id !== duplicateSlug._id.toString()) {
      throw new ConflictException(ResponseMessages.LABEL_SLUG_ALREADY_EXIST);
    }

    // update label by id
    const [updatedLabel, existSeo] = await Promise.all([
      this.labelRepository.updateById(id, body.label, {
        new: true,
      }),
      this.seoRepository.findByCategory(existLabel._id.toString()),
    ]);
    if (!updatedLabel) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_LABEL,
      );
    }

    // update url
    if (body.label.slug) {
      const publicSettings = await this.publicSettingsRepository.findAll();
      const clientDomain: string = publicSettings[0].siteAddress;
      await this.labelRepository.updateById(id, {
        slugUrl: `${clientDomain}/labels/${body.label.slug}`,
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
          label: existLabel._id.toString(),
        });
      }

      return {
        statusCode: HttpStatus.OK,
        data: {
          category: updatedLabel,
          seo: upsertedSeo,
        },
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        category: updatedLabel,
      },
    };
  }

  async deleteManyByIds(labelIds: string[]): Promise<ResponseFormat<any>> {
    const existLabels = await this.labelRepository.findManyByIds(labelIds);
    // check exist labels by IDs
    if (existLabels.length !== labelIds.length) {
      throw new BadRequestException(ResponseMessages.LABELS_NOT_FOUND);
    }
    
    // delete many labels by ids
    const deletedResult = await this.labelRepository.deleteManyByIds(labelIds);
    if (deletedResult.deletedCount !== labelIds.length) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_LABELS,
      );
    }
    
    const deletedSeoResult = await this.seoRepository.deleteManyByLabelId(
      labelIds,
    );
    if (deletedSeoResult.deletedCount !== labelIds.length) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_LABELS,
      );
    }
    
    await this.productRepository.deleteManyByLabelId(labelIds);
    
    await this.postRepository.deleteManyByLabelId(labelIds);

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.LABELS_DELETED,
    };
  }

  async getLabelList(
    type: TypeQueryEnum,
    search: string | undefined,
  ): Promise<ResponseFormat<any>> {
    const [seos, hasWithoutLabelProduct, hasWithoutLabelPost] =
      await Promise.all([
        this.seoRepository.findWithLabel(),
        this.labelRepository.findByProductWithoutLabel(),
        this.labelRepository.findByPostWithoutLabel(),
      ]);

    if (!seos) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_SEO_LIST,
      );
    }
    if (!hasWithoutLabelProduct) {
      await this.labelRepository.createProductWithoutLabel();
    }
    if (!hasWithoutLabelPost) {
      await this.labelRepository.createPostWithoutLabel();
    }

    let query: any = {};
    if (type === TypeQueryEnum.POST) query.type = TypeQueryEnum.POST;
    if (type === TypeQueryEnum.PRODUCT) query.type = TypeQueryEnum.PRODUCT;
    if (search) query.name = { $regex: search, $options: 'i' };

    const labels = await this.labelRepository.findAll(query);
    if (!labels) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_LABEL_LIST,
      );
    }

    const labelList = labels.map((label: LabelDocument) => {
      const seo = seos.find((seo: SeoDocument) => {
        return seo?.label?.toString() === label._id.toString();
      });
      return { label, seo };
    });

    return {
      statusCode: HttpStatus.OK,
      data: {
        label: labelList,
      },
    };
  }

  async getLabelListWithPopulate(
    type: TypeQueryEnum,
  ): Promise<ResponseFormat<any>> {
    const [seos, hasWithoutLabelProduct, hasWithoutLabelPost] =
      await Promise.all([
        this.seoRepository.findWithCategory(),
        this.labelRepository.findByProductWithoutLabel(),
        this.labelRepository.findByPostWithoutLabel(),
      ]);

    if (!seos) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_SEO_LIST,
      );
    }
    if (!hasWithoutLabelProduct) {
      await this.labelRepository.findByProductWithoutLabel();
    }
    if (!hasWithoutLabelPost) {
      await this.labelRepository.findByPostWithoutLabel();
    }

    const labels = await this.labelRepository.findAllWithPopulate({
      parent: undefined,
      type:
        type === TypeQueryEnum.POST
          ? TypeQueryEnum.POST
          : TypeQueryEnum.PRODUCT,
    });
    if (!labels) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_LABEL_LIST,
      );
    }

    const labelList = labels.map((label: LabelDocument) => {
      const seo = seos.find((seo: SeoDocument) => {
        return seo?.label?.toString() === label._id.toString();
      });
      return { label, seo };
    });

    return {
      statusCode: HttpStatus.OK,
      data: {
        labels: labelList,
      },
    };
  }

  async uploadImage(
    userId: string,
    labelId: string,
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

      const [existLabel, updatedResult] = await Promise.all([
        this.labelRepository.findById(labelId),
        this.labelRepository.updateById(labelId, {
          image: path,
        } as CreateLabelDto),
      ]);
      if (!existLabel) {
        throw new NotFoundException(ResponseMessages.LABEL_NOT_FOUND);
      }
      if (!updatedResult) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_UPLOAD_IMAGE,
        );
      }

      await this.galleryRepository.create({
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
