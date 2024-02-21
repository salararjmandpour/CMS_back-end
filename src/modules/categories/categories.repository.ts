import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

import { CreateCategoryDto } from './dtos/create-category.dto';
import {
  Category,
  CategoryDocument,
  TypeEnum,
} from './schemas/category.schema';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  create(data: CreateCategoryDto) {
    return this.categoryModel.create(data);
  }

  updateById(
    _id: string,
    update: Partial<CreateCategoryDto>,
    options?: QueryOptions<Category>,
  ) {
    return this.categoryModel.findOneAndUpdate(
      { _id },
      { $set: update },
      options,
    );
  }

  findById(id: string, projection?: ProjectionType<CategoryDocument>) {
    return this.categoryModel.findById(id, projection).populate([
      {
        path: 'supplier',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  findManyByIds(IDs: string[]) {
    return this.categoryModel.find({ _id: { $in: IDs } }).populate([
      {
        path: 'supplier',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  findBySlug(slug: string, projection?: ProjectionType<CategoryDocument>) {
    return this.categoryModel.findOne({ slug }, projection).populate([
      {
        path: 'supplier',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  findByTitle(title: string, projection?: ProjectionType<CategoryDocument>) {
    return this.categoryModel.findOne({ title }, projection);
  }

  findAll(filter?: FilterQuery<CategoryDocument>) {
    return this.categoryModel.find(filter).populate([
      {
        path: 'supplier',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  deleteManyByIds(Ids: string[]): Promise<any> {
    return this.categoryModel.deleteMany({ _id: { $in: Ids } });
  }

  findByProductWithoutCategory() {
    return this.categoryModel.findOne({
      slug: 'without-category',
      type: TypeEnum.PRODUCT,
    });
  }

  findByPostWithoutCategory() {
    return this.categoryModel.findOne({
      slug: 'without-category',
      type: TypeEnum.POST,
    });
  }

  createProductWithoutCategory() {
    return this.categoryModel.create({
      slug: 'without-category',
      type: TypeEnum.PRODUCT,
      title: 'بدون دسته بندی',
      supplier: '65c89bd7838c4be7ade9bdab',
      isWthOutCategory: true,
    });
  }

  createPostWithoutCategory() {
    return this.categoryModel.create({
      slug: 'without-category',
      type: TypeEnum.POST,
      title: 'بدون دسته بندی',
      supplier: '65c89bd7838c4be7ade9bdab',
      isWthOutCategory: true,
    });
  }
}
