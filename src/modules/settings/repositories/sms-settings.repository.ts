import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, UpdateQuery } from 'mongoose';

import {
  SmsSettings,
  SmsSettingsDocument,
} from '../schemas/sms-settings.schema';
import { SetSmsConfigDto } from '../dtos/set-sms-config.dto';

@Injectable()
export class SmsSettingsRepository {
  constructor(
    @InjectModel(SmsSettings.name)
    private readonly smsSettingsModel: Model<SmsSettings>,
  ) {}

  findAndUpdate(
    _id: string,
    update: UpdateQuery<SmsSettingsDocument>,
    options: QueryOptions = {},
  ) {
    return this.smsSettingsModel.findOneAndUpdate({ _id }, update, options);
  }

  findAll() {
    return this.smsSettingsModel.find();
  }

  create(data: SetSmsConfigDto) {
    return this.smsSettingsModel.create(data);
  }
}
