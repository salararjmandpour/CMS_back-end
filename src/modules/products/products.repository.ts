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
    return this.productModel
      .findOne(filder, projection)
      .populate([
        { path: 'category', select: '_id title slug' },
        {
          path: 'supplier',
          select: '_id avatar mobile email role firstName lastName username',
        },
      ])
      .exec();
  }

  findAll(
    filter?: FilterQuery<ProductDocument>,
    projection?: ProjectionFields<ProductDocument>,
    options?: QueryOptions<ProductDocument>,
  ) {
    return this.productModel.find(filter, projection, options).populate([
      { path: 'categories', select: '_id title slug' },
      {
        path: 'writer',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  findById(id: string, projection?: ProjectionFields<ProductDocument>) {
    return this.productModel
      .findById(id, projection)
      .populate([
        { path: 'category', select: '_id title slug' },
        {
          path: 'supplier',
          select: '_id avatar mobile email role firstName lastName username',
        },
      ])
      .exec();
  }

  findByProductId(
    productId: string,
    projection?: ProjectionFields<ProductDocument>,
  ) {
    return this.productModel
      .findOne({ productId }, projection)
      .populate([
        { path: 'category', select: '_id title slug' },
        {
          path: 'supplier',
          select: '_id avatar mobile email role firstName lastName username',
        },
      ])
      .exec();
  }

  deleteManyByIds(productId: string[]): Promise<any> {
    return this.productModel.deleteMany({ _id: { $in: productId } });
  }

  deleteManyByLabelId(labelId: string[]): Promise<any> {
    return this.productModel
      .updateMany(
        { 'labels.value._id': { $in: labelId } },
        {
          $pull: {
            labels: {
              'value._id': { $in: labelId },
            },
          },
        },
      )
      .exec();
  }

  deleteManyByCategoryId(categoryId: string[]): Promise<any> {
    return this.productModel
      .updateMany(
        { 'category.value._id': { $in: categoryId } },
        {
          $pull: {
            category: {
              'value._id': { $in: categoryId },
            },
          },
        },
      )
      .exec();
  }

  findManyByIds(ids: string[]) {
    return this.productModel.find({ _id: { $in: ids } });
  }

  async getProductList(
    page: number = 1,
    limit: number = 10,
    search?: string | undefined,
  ) {
    return await this.productModel
      .find(search ? { $text: { $search: search } } : {})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate([
        // { path: 'category', select: '_id title slug' },
        {
          path: 'supplier',
          select: '_id avatar mobile email role firstName lastName username',
        },
      ])
      .exec();
  }

  findByIdAndUpdate(
    _id: string,
    update: UpdateQuery<ProductDocument>,
    options?: QueryOptions,
  ) {
    return this.productModel.findOneAndUpdate({ _id }, update, options);
  }

  async updateByLabelId(labelId: string, labelTitle: string): Promise<any> {
    return this.productModel
      .updateMany(
        { 'labels.value._id': labelId },
        {
          $set: {
            'labels.$.value.title': labelTitle,
          },
        },
      )
      .exec();
  }

  async updateByCategoryId(categoryId: string, categoryTitle: string): Promise<any> {
    return this.productModel
      .updateMany(
        { 'category.value._id': categoryId },
        {
          $set: {
            'category.$.value.title': categoryTitle,
          },
        },
      )
      .exec();
  }

  searchByTitle(title: string = '') {
    return this.productModel
      .find({ title: { $regex: title, $options: 'i' } })
      .limit(20)
      .populate([
        // { path: 'category', select: '_id title slug' },
        {
          path: 'supplier',
          select: '_id avatar mobile email role firstName lastName username',
        },
      ]);
  }

  incrementViewCount(productId: string) {
    return this.productModel.findOneAndUpdate(
      { _id: productId },
      { $inc: { view: 1 } },
      { new: true },
    );
  }
}
