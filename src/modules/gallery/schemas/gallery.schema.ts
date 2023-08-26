import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TypeEnum {
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
}

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Gallery {
  @Prop({
    type: String,
    required: true,
  })
  path: string;

  @Prop({
    type: String,
    required: true,
    enum: [TypeEnum.IMAGE, TypeEnum.AUDIO, TypeEnum.VIDEO],
  })
  type: TypeEnum;

  @Prop({
    type: Number,
    required: true,
  })
  size: number;

  @Prop({
    type: String,
    default: null,
  })
  dimensions: Object;

  @Prop({
    type: String,
    required: true,
  })
  alternativeText: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;
}

export type GalleryDocument = Gallery & Document;
export const GallerySchema = SchemaFactory.createForClass(Gallery);

GallerySchema.index({ title: 'text', description: 'text' });
