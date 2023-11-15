import {
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { FileService } from '../file/file.service';
import { SeoRepository } from '../seo/seo.repository';
import { ProductsRepository } from './products.repository';
import { ProductDocument } from './schema/product.schema';

import { UpdateProductWithSeoDto } from './dtos/update-product.dto';
import { CreateProductWithCeoDto } from './dtos/create-product.dto';

import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

import { copyObject } from 'src/core/utils/copy-object';
import { listOfImagesFromRequest } from 'src/core/utils/imaeg-list-from-request.util';
import { calculateDiscountPercentage } from 'src/core/utils/discount-percentage.util';

@Injectable()
export class ProductsService {
  constructor(
    private fileService: FileService,
    private seoRepository: SeoRepository,
    private productRepository: ProductsRepository,
  ) {}

  async create(
    userId: string,
    body: CreateProductWithCeoDto,
  ): Promise<ResponseFormat<any>> {
    // check exust product property in request body
    if (!body?.product) {
      throw new BadRequestException('product is required');
    }

    // *** calculate discount percentage ***
    const { regularPrice, discountedPrice } = body.product;

    if (!!discountedPrice) {
      if (regularPrice < discountedPrice) {
        throw new BadRequestException(
          ResponseMessages.REGULAR_PRICE_SHOULD_BE_GREATER_THAN_DISCOUNTED_PRICE,
        );
      }
      const discount = calculateDiscountPercentage(
        regularPrice,
        discountedPrice,
      );

      body.product.discount = discount;
    }

    // save product in database
    const createdResult = await this.productRepository.create({
      ...body.product,
      supplier: userId,
    });
    if (!createdResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_PRODUCT,
      );
    }

    // save seo in database
    const product: ProductDocument = copyObject(createdResult);
    await this.seoRepository.create({ ...body.seo, product: product._id });

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.PRODUCT_CREATED_SUCCESS,
    };
  }

  async findById(id: string): Promise<ResponseFormat<any>> {
    // check exist product
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(ResponseMessages.PRODUCT_NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        product,
      },
    };
  }

  async getProductList(
    page: number | undefined,
    limit: number | undefined,
    search?: string | undefined,
  ): Promise<ResponseFormat<any>> {
    const products = await this.productRepository.getProductList(
      page,
      limit,
      search,
    );

    if (!products) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_PRODUCT_LIST,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        products,
      },
    };
  }

  async update(
    productId: string,
    body: UpdateProductWithSeoDto,
  ): Promise<ResponseFormat<any>> {
    // check exist product
    const existProduct = await this.productRepository.findById(productId);
    if (!existProduct) {
      throw new BadRequestException(ResponseMessages.PRODUCT_NOT_FOUND);
    }

    // *** calculate discount percentage ***
    if (!!body?.product?.discountedPrice) {
      const { regularPrice, discountedPrice } = body.product;
      const _discountedPrice = discountedPrice || existProduct.discountedPrice;

      if (regularPrice < _discountedPrice) {
        throw new BadRequestException(
          ResponseMessages.REGULAR_PRICE_SHOULD_BE_GREATER_THAN_DISCOUNTED_PRICE,
        );
      }
      const discount = calculateDiscountPercentage(
        regularPrice,
        _discountedPrice,
      );

      body.product.discount = discount;
    }

    const response: { statusCode: number; data: { product: any; seo?: any } } =
      {
        statusCode: HttpStatus.OK,
        data: {
          product: null,
        },
      };

    if (body.seo) {
      // update seo in database
      const updatedSeo = await this.seoRepository.updateByProductId(
        productId,
        {
          ...body.seo,
        },
        { new: true },
      );
      response.data.seo = updatedSeo;
    }

    // update product in database
    const updatedResult = await this.productRepository.findByIdAndUpdate(
      productId,
      body,
    );
    if (!updatedResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_PRODUCT,
      );
    }
    response.data.product = updatedResult;

    return response;
  }

  async uploadImages(
    productId: string,
    files: Express.Multer.File[],
  ): Promise<ResponseFormat<any>> {
    // check exist product
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException(ResponseMessages.PRODUCT_NOT_FOUND);
    }

    // check exist files
    if (!files) {
      throw new BadRequestException(ResponseMessages.IMAGES_IS_REQUIRED);
    }

    // delete prev images
    await this.fileService.deleteFilesByPath(product.images);

    // update product in database
    const images = listOfImagesFromRequest(files);
    const updatedResult = await this.productRepository.findByIdAndUpdate(
      productId,
      { images },
      { new: true },
    );
    if (!updatedResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_PRODUCT,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.UPLOADED_IMAGES,
      data: {
        product: updatedResult,
      },
    };
  }

  async searchByTitle(title: string): Promise<ResponseFormat<any>> {
    if (!title) {
      throw new BadRequestException(ResponseMessages.TITLE_IS_REQUIRED);
    }

    const products = await this.productRepository.searchByTitle(title);

    return {
      statusCode: HttpStatus.OK,
      data: {
        products,
      },
    };
  }
}
