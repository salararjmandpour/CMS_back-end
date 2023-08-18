import {
  Injectable,
  HttpStatus,
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
console.log({body})
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
}
