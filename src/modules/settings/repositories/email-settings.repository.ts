import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, UpdateQuery } from 'mongoose';

import {
  EmailSettings,
  EmailSettingsDocument,
} from '../schemas/email-settings.schema';
import { SetEmailConfigDto } from '../dtos/set-email-config.dto';

@Injectable()
export class EmailSettingsRepository {
  constructor(
    @InjectModel(EmailSettings.name)
    private readonly mailSettingsModel: Model<EmailSettings>,
  ) {}

  findAndUpdate(
    _id: string,
    update: UpdateQuery<EmailSettingsDocument>,
    options: QueryOptions = {},
  ) {
    return this.mailSettingsModel.findOneAndUpdate({ _id }, update, options);
  }

  findAndUpdates(_id: string, update: UpdateQuery<EmailSettingsDocument>) {
    return this.mailSettingsModel.findOneAndUpdate({ _id }, update, {
      new: true,
      runValidators: true,
    });
  }

  findAll() {
    return this.mailSettingsModel.find();
  }

  create(data: SetEmailConfigDto) {
    return this.mailSettingsModel.create(data);
  }
}
