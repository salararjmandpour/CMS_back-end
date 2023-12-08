import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DiscountCodeRepository } from './discount-code.repository';
import { CreateDiscountCodeDto } from './dtos/create-discount-code.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class DiscountCodeService {
  constructor(private discountCodeRepo: DiscountCodeRepository) {}

  async create(body: CreateDiscountCodeDto): Promise<ResponseFormat<any>> {
    if (body.generateDiscountCode) {
    }

    const createdProduct = await this.discountCodeRepo.create(body);
    if (!createdProduct) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_DISCOUNT_CODE,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.DISCOUNT_CODE_CREATED_SUCCESS,
    };
  }
}
