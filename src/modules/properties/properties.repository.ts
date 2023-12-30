import { Injectable } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  ProjectionType,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { Property } from './schema/property.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';

@Injectable()
export class PropertiesRepository {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {}

  findOne(
    filter?: FilterQuery<Property>,
    projection?: ProjectionType<Property>,
  ) {
    return this.propertyModel.findOne(filter, projection);
  }

  create(data: CreatePropertyDto) {
    return this.propertyModel.create(data);
  }

  updateOne(
    filter?: FilterQuery<Property>,
    update?: UpdateWithAggregationPipeline | UpdateQuery<Property>,
  ) {
    return this.propertyModel.updateOne(filter, update);
  }
}
