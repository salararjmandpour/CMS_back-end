import { Model, QueryOptions, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  PublicSettings,
  PublicSettingsDocument,
} from '../schemas/public-settings.schema';
import { SetPublicConfigDto } from '../dtos/set-public-config.dto';

@Injectable()
export class PublicSettingsRepository {
  constructor(
    @InjectModel(PublicSettings.name)
    private readonly publicSettingsModel: Model<PublicSettings>,
  ) {}

  findAll() {
    return this.publicSettingsModel.find();
  }

  create(data: SetPublicConfigDto) {
    return this.publicSettingsModel.create(data);
  }

  findAndUpdate(
    _id: string,
    update: UpdateQuery<PublicSettingsDocument>,
    options: QueryOptions = {},
  ) {
    return this.publicSettingsModel.findOneAndUpdate({ _id }, update, options);
  }
}
