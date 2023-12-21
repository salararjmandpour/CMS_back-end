import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

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
    update: CreateCategoryDto,
    options?: QueryOptions<Category>,
  ) {
    return this.categoryModel.findOneAndUpdate({ _id }, update, options);
  }

  findById(id: string, projection?: ProjectionType<CategoryDocument>) {
    return this.categoryModel.findById(id, projection).populate([
      {
        path: 'supplier',
        select: '_id mobile email role firstName lastName',
      },
    ]);
  }

  findManyByIds(IDs: string[]) {
    return this.categoryModel.find({ _id: { $in: IDs } }).populate([
      {
        path: 'supplier',
        select: '_id mobile email role firstName lastName',
      },
    ]);
  }

  findBySlug(slug: string, projection?: ProjectionType<CategoryDocument>) {
    return this.categoryModel.findOne({ slug }, projection).populate([
      {
        path: 'supplier',
        select: '_id mobile email role firstName lastName',
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
        select: '_id mobile email role firstName lastName',
      },
    ]);
  }

  deleteManyByIds(Ids: string[]): Promise<any> {
    return this.categoryModel.deleteMany({ _id: { $in: Ids } });
  }
}
