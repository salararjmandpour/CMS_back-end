import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PublicSettings } from './schemas/public-settings.schema';

@Injectable()
export class SettingsRepository {
  constructor(
    @InjectModel(PublicSettings.name)
    private readonly publicSettingsModel: Model<PublicSettings>,
  ) {}
}
