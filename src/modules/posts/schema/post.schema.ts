import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum StatusEnum {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Post {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  slug: string;

  @Prop({
    type: Array,
    required: true,
  })
  description: true;

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  writer: string;

  @Prop({
    type: Number,
    default: 0,
  })
  view: number;

  @Prop({
    type: String,
    enum: [StatusEnum.PUBLISHED, StatusEnum.DRAFT],
    default: StatusEnum.PUBLISHED,
  })
  status: StatusEnum;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: Array<Types.ObjectId>,
  })
  categories: string[];
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
