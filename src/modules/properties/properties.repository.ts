import { Injectable } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { Property, PropertyDocument } from './schema/property.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';

@Injectable()
export class PropertiesRepository {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  findOne(
    filter?: FilterQuery<PropertyDocument>,
    projection?: ProjectionType<PropertyDocument>,
  ) {
    return this.propertyModel.findOne(filter, projection);
  }

  create(data: CreatePropertyDto) {
    return this.propertyModel.create(data);
  }

  updateOne(
    filter?: FilterQuery<PropertyDocument>,
    update?: UpdateWithAggregationPipeline | UpdateQuery<PropertyDocument>,
  ) {
    return this.propertyModel.updateOne(filter, update);
  }

  findManyByIds(ids: string[]) {
    return this.propertyModel.find({ _id: { $in: ids } });
  }

  deleteManyByIds(
    ids: string[],
    options?: QueryOptions<PropertyDocument>,
  ): Promise<any> {
    return this.propertyModel.deleteMany({ _id: { $in: ids } }, options);
  }

  find(
    filter?: FilterQuery<PropertyDocument>,
    projection?: ProjectionType<PropertyDocument>,
    options?: QueryOptions<PropertyDocument>,
  ) {
    return this.propertyModel.find(filter, projection, options);
  }
}
