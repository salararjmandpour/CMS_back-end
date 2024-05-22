import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

import { CreateLabelDto } from './dtos/create-label.dto';
import {
  Label,
  LabelDocument,
  TypeEnum,
} from './schemas/label.schema';

@Injectable()
export class LabelsRepository {
  constructor(
    @InjectModel(Label.name) private labelModel: Model<Label>,
  ) {}

  create(data: CreateLabelDto) {
    return this.labelModel.create(data);
  }

  updateById(
    _id: string,
    update: Partial<CreateLabelDto>,
    options?: QueryOptions<Label>,
  ) {
    return this.labelModel.findOneAndUpdate(
      { _id },
      { $set: update },
      options,
    );
  }

  findById(id: string, projection?: ProjectionType<LabelDocument>) {
    return this.labelModel.findById(id, projection).populate([
      {
        path: 'supplier',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  findManyByIds(IDs: string[]) {
    return this.labelModel.find({ _id: { $in: IDs } }).populate([
      {
        path: 'supplier',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  findBySlug(slug: string, projection?: ProjectionType<LabelDocument>) {
    return this.labelModel.findOne({ slug }, projection).populate([
      {
        path: 'supplier',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  findByTitle(name: string, projection?: ProjectionType<LabelDocument>) {
    return this.labelModel.findOne({ name }, projection);
  }

  findAll(filter?: FilterQuery<LabelDocument>) {
    return this.labelModel.find(filter).populate([
      {
        path: 'supplier',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  findAllWithPopulate(filter?: FilterQuery<LabelDocument>) {
    return this.labelModel.find(filter).populate([
      {
        path: 'supplier',
        select: '_id avatar mobile email role firstName lastName username',
      },
      {
        path: 'sublaels',
      },
    ]);
  }

  deleteManyByIds(Ids: string[]): Promise<any> {
    return this.labelModel.deleteMany({ _id: { $in: Ids } });
  }

  findByProductWithoutLabel() {
    return this.labelModel.findOne({
      slug: 'without-label',
      type: TypeEnum.PRODUCT,
    });
  }

  findByPostWithoutLabel() {
    return this.labelModel.findOne({
      slug: 'without-label',
      type: TypeEnum.POST,
    });
  }

  createProductWithoutLabel() {
    return this.labelModel.create({
      slug: 'without-label',
      type: TypeEnum.PRODUCT,
      name: 'بدون دسته بندی',
      isWthOutLabel: true,
    });
  }

  createPostWithoutLabel() {
    return this.labelModel.create({
      slug: 'without-label',
      type: TypeEnum.POST,
      name: 'بدون دسته بندی',
      isWthOutLabel: true,
    });
  }
}
