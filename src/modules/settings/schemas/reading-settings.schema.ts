import { Document as MongooseDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LinkStructuresEnum } from '../dtos/set-slug-config.dto';

export interface IReading {
  id: string;
  title: string;
  link: string;
}

@Schema({
  timestamps: true,
  versionKey: false,
})

export class ReadingSettings {
  @Prop({
    type: Object,
    required: true,
  })
  homePage: IReading;

  @Prop({
    type: Object,
    required: true,
  })
  postsPage: IReading;

  @Prop({
    type: Object,
    required: true,
  })
  shopPage: IReading;
}

export type ReadingSettingsDocument = ReadingSettings & MongooseDocument;
export const ReadingSettingsSchema = SchemaFactory.createForClass(ReadingSettings);
