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
    default: 0,
  })
  count: number;

  @Prop({
    type: Types.ObjectId,
    ref: "User",
    required: true
  })
  supplier: string
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
