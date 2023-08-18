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

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductsRepository) {}

  async create(body: CreateProductDto): Promise<ResponseFormat<any>> {
    // prevent duplicate productId
    const duplicateProductId = await this.productRepository.findOne({
      productId: body.productId,
    });
    if (duplicateProductId) {
      throw new BadRequestException(ResponseMessages.PRODUCT_ID_ALREADY_EXIST);
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
}
