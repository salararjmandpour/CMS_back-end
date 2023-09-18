import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Category {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  slug: string;

  @Prop({
    type: String,
    required: true,
  })
  description: boolean;

  @Prop({
    type: Types.ObjectId,
    default: undefined,
    ref: Category.name,
  })
  parent: Types.ObjectId;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: Number,
  })
  count: number;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
