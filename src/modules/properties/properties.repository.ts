import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Property } from './schema/property.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PropertiesRepository {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {}
}
