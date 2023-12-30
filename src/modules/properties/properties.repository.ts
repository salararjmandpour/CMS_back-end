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
import { Property, PropertyDocument } from './schema/property.schema';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { CreateCharacteristicDto } from './dtos/create-characteristic.dto';

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

  createProperty(data: CreatePropertyDto) {
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

  createCharacteristic(propertyId: string, data: CreateCharacteristicDto) {
    return this.propertyModel.updateOne(
      { _id: propertyId },
      { $push: { characteristics: data } },
    );
  }

  findCharacteristicBySlug(slug: string) {
    return this.propertyModel.findOne({ 'characteristics.slug': slug });
  }

  findCharacteristicById(_id: string) {
    return this.propertyModel.findOne({ 'characteristics._id': _id });
  }

  updateCharacteristic(
    propertyId: string,
    characteristicId: string,
    data: CreateCharacteristicDto,
  ) {
    return this.propertyModel.updateOne(
      { _id: propertyId, 'characteristics._id': characteristicId },
      { $set: { 'characteristics.$': data } },
    );
  }

  // updateCharacteristic(propertyId: string, characteristicId: string): {
  //   return this.propertyModel.updateOne(
  //     { _id: propertyId, 'characteristics._id': characteristicId },
  //     { $pull: { characteristics: { _id: characteristicId } } },
  //   );
  // }
}
