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
  src: string;

  @Prop({
    type: String,
    required: true,
    enum: [TypeEnum.IMAGE, TypeEnum.AUDIO, TypeEnum.VIDEO],
  })
  type: TypeEnum;
}

export type GalleryDocument = Gallery & Document;
export const GallerySchema = SchemaFactory.createForClass(Gallery);

GallerySchema.index({ title: 'text' });
