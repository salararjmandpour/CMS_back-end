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
import { Label, LabelDocument } from './schema/label.schema';
import { CreateLabelDto } from './dtos/create-label.dto';
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

  createLabel(data: CreateLabelDto) {
    return this.labelModel.create(data);
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

  find(
    filter?: FilterQuery<LabelDocument>,
    projection?: ProjectionType<LabelDocument>,
    options?: QueryOptions<LabelDocument>,
  ) {
    return this.labelModel.find(filter, projection, options);
  }

  createSublabel(labelId: string, data: CreateSublabelDto) {
    return this.labelModel.updateOne(
      { _id: labelId },
      { $push: { sublabels: data } },
    );
  }

  findSublabelBySlug(label: string, slug: string) {
    return this.labelModel.findOne({
      _id: label,
      'sublabels.slug': slug,
    });
  }

  findSublabelById(_id: string) {
    return this.labelModel.findOne({ 'sublabels._id': _id });
  }

  findManySublabelByIds(IDs: string[]): Promise<any> {
    return this.labelModel
      .find({
        'sublabels._id': { $in: IDs },
      })
      .select('_id sublabels');
  }

  updateSublabel(labelId: string, sublabelId: string, data: CreateSublabelDto) {
    return this.labelModel.updateOne(
      { _id: labelId, 'sublabels._id': sublabelId },
      { $set: { 'sublabels.$': data } },
    );
  }

  deleteSublabel(labelId: string, sublabelId: string[]): Promise<any> {
    return this.labelModel.updateOne(
      { _id: labelId, 'sublabels._id': sublabelId },
      { $pull: { sublabels: { _id: { $in: sublabelId } } } },
    );
  }
}
