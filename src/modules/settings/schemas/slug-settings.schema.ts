import { Document as MongooseDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LinkStructuresEnum } from '../dtos/set-slug-config.dto';

export interface ISlug {
  category: string;
  linkStructures: LinkStructuresEnum;
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
  postLabelSettings: ISlug;

  @Prop({
    type: Object,
    required: true,
  })
  productSettings: ISlug;

  @Prop({
    type: Object,
    required: true,
  })
  productLabelSettings: ISlug;
}

export type SlugSettingsDocument = SlugSettings & MongooseDocument;
export const SlugSettingsSchema = SchemaFactory.createForClass(SlugSettings);
