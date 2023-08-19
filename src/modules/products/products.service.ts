import {
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dtos/create-product.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductsRepository) {}

  async create(body: CreateProductDto): Promise<ResponseFormat<any>> {
    // prevent duplicate productId and slug
    const [duplicateProductId, duplicateSlug] = await Promise.all([
      this.productRepository.findOne({
        productId: body.productId,
      }),
      this.productRepository.findOne({
        slug: body.slug,
      }),
    ]);

    if (duplicateProductId) {
      throw new BadRequestException(ResponseMessages.PRODUCT_ID_ALREADY_EXIST);
    }

    if (duplicateSlug) {
      throw new BadRequestException(ResponseMessages.SLUG_ALREADY_EXIST);
    }

    // save product in database
    const createdResult = await this.productRepository.create(body);
    if (!createdResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_PRODUCT,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        product: createdResult,
      },
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
    id: string,
    body: UpdateProductDto,
  ): Promise<ResponseFormat<any>> {
    // prevent duplicate productId and slug
    const [duplicateProductId, duplicateSlug] = await Promise.all([
      this.productRepository.findOne({
        productId: body.productId,
      }),
      this.productRepository.findOne({
        slug: body.slug,
      }),
    ]);

    if (duplicateProductId) {
      throw new BadRequestException(ResponseMessages.PRODUCT_ID_ALREADY_EXIST);
    }

    if (duplicateSlug) {
      throw new BadRequestException(ResponseMessages.SLUG_ALREADY_EXIST);
    }

    // update product in database
    const updatedResult = await this.productRepository.findByIdAndUpdate(
      id,
      body,
    );
    if (!updatedResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_PRODUCT,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        product: updatedResult,
      },
    };
  }
}
