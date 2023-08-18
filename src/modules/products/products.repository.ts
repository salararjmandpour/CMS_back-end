import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionFields } from 'mongoose';

import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  create(data: CreateProductDto) {
    return this.productModel.create(data);
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

  getProductList(page: number = 1, limit: number = 10, search?: string) {
    return this.productModel
      .find(search ? { $text: { $search: search } } : {})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }
}
