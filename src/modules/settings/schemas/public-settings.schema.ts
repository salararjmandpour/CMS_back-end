import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class PublicSettings {
  @Prop({
    type: String,
    default: '',
  })
  siteTitle: string;

  @Prop({
    type: String,
    default: '',
  })
  description: string;

  @Prop({
    type: String,
    default: '',
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  siteAddress: string;

  @Prop({
    type: String,
    required: true,
  })
  routeAddress: string;

  @Prop({
    type: String,
  })
  role: string;

  @Prop({
    type: String,
    default: 'Asia/Tehran',
  })
  timezone: string;
}

export type PublicSettingsDocument = PublicSettings & MongooseDocument;
export const PublicSettingsSchema =
  SchemaFactory.createForClass(PublicSettings);
