import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

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
    type: String,
    required: true,
  })
  filename: string;

  @Prop({
    type: String,
    required: true,
  })
  mimetype: string;

  @Prop({
    type: Number,
    required: true,
  })
  size: number;

  @Prop({
    type: Object,
    default: null,
  })
  dimensions: object;

  @Prop({
    type: String,
    default: '',
  })
  alt: string;

  @Prop({
    type: String,
    default: '',
  })
  title: string;

  @Prop({
    type: String,
    default: '',
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  uploadedBy: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  uploadedIn: string;
}

export type GalleryDocument = Gallery & Document;
export const GallerySchema = SchemaFactory.createForClass(Gallery);

GallerySchema.index({ title: 'text' });
