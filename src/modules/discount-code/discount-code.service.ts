import {
  HttpStatus,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  nanoid,
  alphabetNumber,
  alphabetLetters,
} from 'src/core/utils/nanoid.util';
import { DiscountCodeRepository } from './discount-code.repository';
import { CreateDiscountCodeDto } from './dtos/create-discount-code.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { UpdateDiscountCodeDto } from './dtos/update-discount-code.dto';

@Injectable()
export class DiscountCodeService {
  constructor(private discountCodeRepo: DiscountCodeRepository) {}

  async create(body: CreateDiscountCodeDto): Promise<ResponseFormat<any>> {
    if (!body.generateDiscountCode && !body.discountCode) {
      throw new BadRequestException(
        ResponseMessages.PLEASE_ENTER_A_DISCOUNT_CODE,
      );
    }

    if (body.generateDiscountCode) {
      body.discountCode = nanoid(alphabetLetters + alphabetNumber);
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

  async update(
    id: string,
    body: UpdateDiscountCodeDto,
  ): Promise<ResponseFormat<any>> {
    // const duplicatedDiscountCode = await this.discountCodeRepo.findById(id)
    // if (duplicatedDiscountCode && duplicatedDiscountCode ===duplicatedDiscountCode.) {

    // }

    const createdProduct = await this.discountCodeRepo.update(id, body);
    if (createdProduct.modifiedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_DISCOUNT_CODE,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.DISCOUNT_CODE_UPDATED_SUCCESS,
    };
  }
}
