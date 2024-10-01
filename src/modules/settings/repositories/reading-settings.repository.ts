import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, UpdateQuery } from 'mongoose';
import { SetReadingConfigDto } from '../dtos/set-reading-setting.dto';
import { ReadingSettings, ReadingSettingsDocument } from '../schemas/reading-settings.schema';

@Injectable()
export class ReadingSettingsRepository {
  constructor(
    @InjectModel(ReadingSettings.name)
    private readonly readingSettingsModel: Model<ReadingSettings>,
    
  ) {}

  findAll() {
    return this.readingSettingsModel.find();
  }

  create(data: SetReadingConfigDto) {
    return this.readingSettingsModel.create(data);
  }

  findAndUpdate(
    _id: string,
    update: UpdateQuery<ReadingSettingsDocument>,
    options: QueryOptions = {},
  ) {
    return this.readingSettingsModel.findOneAndUpdate({ _id }, update, options);
  }
}
