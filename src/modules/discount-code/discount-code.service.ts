import {
  HttpStatus,
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
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

    const duplicatedDiscountCode =
      await this.discountCodeRepo.findByDiscountCode(body.discountCode);
    if (duplicatedDiscountCode) {
      throw new ConflictException(ResponseMessages.DISCOUNT_CODE_ALREADY_EXIST);
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
    const [discountCode, duplicatedDiscountCode] = await Promise.all([
      this.discountCodeRepo.findById(id),
      this.discountCodeRepo.findByDiscountCode(body.discountCode),
    ]);
    if (!discountCode) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_DISCOUNT_CODE);
    }
    if (
      duplicatedDiscountCode &&
      id !== duplicatedDiscountCode._id.toString()
    ) {
      throw new ConflictException(ResponseMessages.DISCOUNT_CODE_ALREADY_EXIST);
    }

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

  async delete(ids: string[]): Promise<ResponseFormat<any>> {
    const discountCodes = await this.discountCodeRepo.findManyByIds(ids);
    if (discountCodes.length !== ids.length) {
      throw new BadRequestException(ResponseMessages.NOT_FOUNDS_DISCOUNT_CODES);
    }

    const deletedResult = await this.discountCodeRepo.deleteMany(ids);
    if (deletedResult.deletedCount !== ids.length) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_DISCOUNT_CODES,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.DISCOUNT_CODES_DELETED_SUCCESS,
    };
  }

  async findAll(): Promise<ResponseFormat<any>> {
    const discountCode = await this.discountCodeRepo.findAll();

    return {
      statusCode: HttpStatus.OK,
      data: {
        discountCode,
      },
    };
  }
}
