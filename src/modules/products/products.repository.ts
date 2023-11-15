import {
  Model,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  ProjectionFields,
} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { alphabetNumber, nanoid } from 'src/core/utils/nanoid.util';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  create(data: CreateProductDto) {
    return this.productModel.create({
      ...data,
      productId: nanoid(alphabetNumber, 16),
    });
  }

  findOne(
    filder: FilterQuery<ProductDocument>,
    projection?: ProjectionFields<ProductDocument>,
  ) {
    return this.productModel.findOne(filder, projection).exec();
  }

  findById(id: string, projection?: ProjectionFields<ProductDocument>) {
    return this.productModel.findById(id, projection);
  }

  getProductList(
    page: number = 1,
    limit: number = 10,
    search?: string | undefined,
  ) {
    return this.productModel
      .find(search ? { $text: { $search: search } } : {})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  findByIdAndUpdate(
    _id: string,
    update: UpdateQuery<ProductDocument>,
    options?: QueryOptions,
  ) {
    return this.productModel.findOneAndUpdate({ _id }, update, options);
  }

  searchByTitle(title: string = '') {
    return this.productModel
      .find({ title: { $regex: title, $options: 'i' } })
      .limit(20);
  }
}
