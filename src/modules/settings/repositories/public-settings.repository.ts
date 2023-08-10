import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PublicSettings } from '../schemas/public-settings.schema';

@Injectable()
export class PublicSettingsRepository {
  constructor(
    @InjectModel(PublicSettings.name)
    private readonly publicSettingsModel: Model<PublicSettings>,
  ) {}

  findAll() {
    return this.publicSettingsModel.find();
  }
}
