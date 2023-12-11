import { Model, ProjectionType } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DiscountCode } from './schemas/discount-code.schema';
import {
  CreateDiscountCodeInput,
  UpdateDiscountCodeInput,
} from 'src/core/interfaces/discount-code.interface';

@Injectable()
export class DiscountCodeRepository {
  constructor(
    @InjectModel(DiscountCode.name)
    private discountCodeModel: Model<DiscountCode>,
  ) {}

  create(data: CreateDiscountCodeInput) {
    return this.discountCodeModel.create(data);
  }

  update(id: string, data: UpdateDiscountCodeInput) {
    return this.discountCodeModel.updateOne({ _id: id }, { $set: data });
  }

  findById(id: string, projection?: ProjectionType<DiscountCode>) {
    return this.discountCodeModel.findOne({ _id: id }, projection);
  }
}
