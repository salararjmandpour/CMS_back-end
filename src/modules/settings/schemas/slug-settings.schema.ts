import { Document as MongooseDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface ISlug {
  category: string;
  linkeStructures: string;
  link: string;
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class SlugSettings {
  @Prop({
    type: Object,
    required: true,
  })
  postSettings: ISlug;

  @Prop({
    type: Object,
    required: true,
  })
  postLableSettings: ISlug;

  @Prop({
    type: Object,
    required: true,
  })
  productSettings: ISlug;

  @Prop({
    type: Object,
    required: true,
  })
  productLableSettings: ISlug;
}

export type SlugSettingsDocument = SlugSettings & MongooseDocument;
export const SlugSettingsSchema = SchemaFactory.createForClass(SlugSettings);
