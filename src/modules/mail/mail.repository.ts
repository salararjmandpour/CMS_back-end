import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, UpdateQuery } from 'mongoose';

import {
  EmailSettings,
  EmailSettingsDocument,
} from './schemas/email-settings.schema';
import { SetConfigDto } from './dto/set-config.dto';

@Injectable()
export class MailRepository {
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

  create(data: SetConfigDto) {
    return this.mailSettingsModel.create(data);
  }
}
