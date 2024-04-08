import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, UpdateQuery } from 'mongoose';

import {
  SlugSettings,
  SlugSettingsDocument,
} from '../schemas/slug-settings.schema';
import { SetSlugCnfigDto } from '../dtos/set-slug-config.dto';

@Injectable()
export class SlugSettingsRepository {
  constructor(
    @InjectModel(SlugSettings.name)
    private readonly slugSettingsModel: Model<SlugSettings>,
  ) {}

  findAll() {
    return this.slugSettingsModel.find();
  }

  create(data: SetSlugCnfigDto) {
    return this.slugSettingsModel.create(data);
  }

  findAndUpdate(
    _id: string,
    update: UpdateQuery<SlugSettingsDocument>,
    options: QueryOptions = {},
  ) {
    return this.slugSettingsModel.findOneAndUpdate({ _id }, update, options);
  }
}
