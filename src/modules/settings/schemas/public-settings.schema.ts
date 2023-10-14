import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class PublicSettings {
  @Prop({
    type: String,
    required: true,
  })
  siteTitle: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  role: string;

  @Prop({
    type: String,
    required: true,
  })
  timezone: string;
}

export type PublicSettingsDocument = PublicSettings & MongooseDocument;
export const PublicSettingsSchema = SchemaFactory.createForClass(PublicSettings);
