import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/modules/users/schema/user.schema';
import { Category } from 'src/modules/categories/schemas/category.schema';

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
  description: object;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
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
    default: null,
  })
  image: string;

  @Prop({
    type: [Types.ObjectId],
    ref: Category.name,
    default: [],
  })
  categories: string[];

  @Prop({
    type: String,
  })
  slugUrl: string;

  @Prop({
    type: String,
  })
  idUrl: string;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
