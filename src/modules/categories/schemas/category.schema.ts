import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TypeEnum {
  PRODUCT = 'product',
  POST = 'post',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Category {
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
    type: String,
    default: '',
  })
  description: string;

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
    ref: 'User',
    required: true,
  })
  supplier: string;

  @Prop({
    type: String,
    enum: [TypeEnum.PRODUCT, TypeEnum.POST],
    required: true,
  })
  type: TypeEnum;

  @Prop({
    type: Boolean,
  })
  isWthOutCategory?: boolean;

  @Prop({
    type: String,
  })
  slugUrl: string;

  @Prop({
    type: String,
  })
  idUrl: string;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
