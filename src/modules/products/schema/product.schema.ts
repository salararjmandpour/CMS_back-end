import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface ISpecifications {
  key: string;
  value: string;
}

interface ISize {
  length: number;
  height: number;
  width: number;
  weight: number;
  weightUnit: 'g' | 'kg';
  dimensionsUnit: 'cm' | 'm';
}

// Specifications Schema
@Schema({
  versionKey: false,
})
class Specifications {
  @Prop({
    type: String,
    required: true,
  })
  key: string;

  @Prop({
    type: String,
    required: true,
  })
  value: string;
}

// Size Schema
@Schema({
  versionKey: false,
})
class Size {
  @Prop({
    type: String,
    required: true,
    default: 0,
  })
  length: number;

  @Prop({
    type: String,
    required: true,
    default: 0,
  })
  height: number;

  @Prop({
    type: String,
    required: true,
    default: 0,
  })
  width: number;

  @Prop({
    type: String,
    required: true,
    default: 0,
  })
  weight: number;

  @Prop({
    type: String,
    required: true,
    default: 'g',
  })
  weightUnit: 'g' | 'kg'; // g or kg

  @Prop({
    type: String,
    required: true,
    default: 'cm',
  })
  dimensionsUnit: 'cm' | 'm'; // cm or m
}

const SizeSchema = SchemaFactory.createForClass(Size);
const SpecificationsSchema = SchemaFactory.createForClass(Specifications);

// Product schema
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Product {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  productId: string;

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

  @Prop({
    type: String,
  })
  shortDescription: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  slug: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    default: 0,
  })
  discount: string;

  @Prop({
    type: Number,
    required: true,
  })
  count: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  supplier: string;

  @Prop({
    type: [Types.ObjectId],
    default: [],
  })
  comments: string[];

  @Prop({
    type: SizeSchema,
    required: true,
  })
  size: ISize;

  @Prop({
    type: [String],
    default: [],
  })
  images: [];

  @Prop({
    type: Boolean,
  })
  inStock: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  category: string;

  @Prop({
    type: [{ type: SpecificationsSchema }],
    default: [],
  })
  specifications: ISpecifications[];
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
