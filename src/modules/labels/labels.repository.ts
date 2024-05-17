import {
  Model,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  ProjectionType,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Label, LabelDocument, TypeEnum } from './schema/label.schema';
import { CreateLabeWithSeoDto, CreateLabelDto } from './dtos/create-label.dto';
import { CreateSublabelDto } from './dtos/create-sublabel.dto';

@Injectable()
export class LabelsRepository {
  constructor(
    @InjectModel(Label.name) private labelModel: Model<LabelDocument>,
  ) {}

  findOne(
    filter?: FilterQuery<LabelDocument>,
    projection?: ProjectionType<LabelDocument>,
  ) {
    return this.labelModel.findOne(filter, projection);
  }

  findByProductWithoutLabel() {
    return this.labelModel.findOne({
      // slug: 'without-label',
      type: TypeEnum.PRODUCT,
    });
  }

  findByPostWithoutLabel() {
    return this.labelModel.findOne({
      // slug: 'without-label',
      type: TypeEnum.POST,
    });
  }

  createProductWithoutLabel() {
    return this.labelModel.create({
      slug: 'without-category',
      type: TypeEnum.PRODUCT,
      name: 'بدون دسته بندی',
    });
  }

  createPostWithoutLabel() {
    return this.labelModel.create({
      slug: 'without-category',
      type: TypeEnum.POST,
      name: 'بدون دسته بندی',
    });
  }

  // findAll(filter?: FilterQuery<LabelDocument>) {
  //   return this.labelModel.find(filter).populate([
  //     {
  //       path: 'supplier',
  //       select: '_id avatar mobile email role firstName lastName username',
  //     },
  //   ]);
  // }

  createLabel(data: CreateLabeWithSeoDto) {
    return this.labelModel.create(data.label);
  }

  updateOne(
    filter?: FilterQuery<LabelDocument>,
    update?: UpdateWithAggregationPipeline | UpdateQuery<LabelDocument>,
  ) {
    return this.labelModel.updateOne(filter, update);
  }

  findManyByIds(ids: string[]) {
    return this.labelModel.find({ _id: { $in: ids } });
  }

  deleteManyByIds(
    ids: string[],
    options?: QueryOptions<LabelDocument>,
  ): Promise<any> {
    return this.labelModel.deleteMany({ _id: { $in: ids } }, options);
  }

  findAll(
    filter?: FilterQuery<LabelDocument>,
    projection?: ProjectionType<LabelDocument>,
    options?: QueryOptions<LabelDocument>,
  ) {
    return this.labelModel.find(filter, projection, options);
  }

  createSublabel(labelId: string, data: CreateSublabelDto) {
    return this.labelModel.updateOne(
      { _id: labelId },
      { $push: { sublabls: data } },
    );
  }

  findSublabelBySlug(label: string, slug: string) {
    return this.labelModel.findOne({
      _id: label,
      'sublabls.slug': slug,
    });
  }

  findSublabelById(_id: string) {
    return this.labelModel.findOne({ 'sublabls._id': _id });
  }

  findManySublabelByIds(IDs: string[]): Promise<any> {
    return this.labelModel
      .find({
        'sublabls._id': { $in: IDs },
      })
      .select('_id sublabels');
  }

  updateSublabel(labelId: string, sublabelId: string, data: CreateSublabelDto) {
    return this.labelModel.updateOne(
      { _id: labelId, 'sublabls._id': sublabelId },
      { $set: { 'sublabls.$': data } },
    );
  }

  deleteSublabel(labelId: string, sublabelId: string[]): Promise<any> {
    return this.labelModel.updateOne(
      { _id: labelId, 'sublabls._id': sublabelId },
      { $pull: { sublabls: { _id: { $in: sublabelId } } } },
    );
  }
}
