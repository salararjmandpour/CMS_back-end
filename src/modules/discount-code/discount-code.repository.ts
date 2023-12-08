import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DiscountCode } from './schemas/discount-code.schema';
import { CreateDiscountCodeInput } from 'src/core/interfaces/discount-code.interface';

@Injectable()
export class DiscountCodeRepository {
  constructor(
    @InjectModel(DiscountCode.name)
    private discountCodeModel: Model<DiscountCode>,
  ) {}

  create(data: CreateDiscountCodeInput) {
    return this.discountCodeModel.create(data);
  }
}
