import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISize, SizeSchema } from './size.schema';
import { Category } from 'src/modules/categories/schemas/category.schema';
import { ISpecifications, SpecificationsSchema } from './specification.schema';

export enum ProductUnitEnum {
  NUMBER = 'number',
  PACKAGE = 'package',
  CARTON = 'carton',
  METER = 'meter',
  CENTIMETER = 'centimeter',
  KILOGRAM = 'kilogram',
  GRAM = 'gram',
}

enum SMSStatusEnum {
  AUCTIONED_TIME = 'AUCTIONED_TIME',
  AVAILABLE_TIEM = 'AVAILABLE_TIEM',
  ENDING_TIME = 'ENDING_TIME',
}

export type SMS = [
  {
    status: SMSStatusEnum.AUCTIONED_TIME;
    title: String;
    message: String;
    isActive: Boolean;
  },
  {
    status: SMSStatusEnum.AVAILABLE_TIEM;
    title: String;
    message: String;
    isActive: Boolean;
  },
  {
    status: SMSStatusEnum.ENDING_TIME;
    title: String;
    message: String;
    isActive: Boolean;
  },
];

export const productSMS = [
  {
    status: SMSStatusEnum.AUCTIONED_TIME,
    title: '',
    message: '',
    isActive: false,
  },
  {
    status: SMSStatusEnum.AVAILABLE_TIEM,
    title: '',
    message: '',
    isActive: false,
  },
  {
    status: SMSStatusEnum.ENDING_TIME,
    title: '',
    message: '',
    isActive: false,
  },
];

// Product schema
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Product {
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
    type: Boolean,
    default: false,
  })
  draft: boolean;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  })
  supplier: string;

  @Prop({
    type: Array<Types.ObjectId>,
    default: [],
  })
  comments: string[];

  @Prop({
    type: String,
    default: '',
  })
  image: String;

  @Prop({
    type: Array<String>,
    default: [],
  })
  images: [];

  @Prop({
    type: Array<Types.ObjectId>,
    required: true,
    ref: Category.name,
  })
  category: string[];

  // *** Price and Discount ***
  @Prop({
    type: Number,
    required: true,
  })
  regularPrice: number;

  @Prop({
    type: Number,
    default: null,
  })
  discountedPrice: number;

  @Prop({
    type: Number,
    default: null,
    min: 0,
    max: 100,
  })
  discount: number;

  @Prop({
    type: String,
    default: null,
  })
  discountStartDate: string;

  @Prop({
    type: String,
    default: null,
  })
  discountEndDate: string;

  // *** Warehouse info ***
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  productId: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  inStock: boolean;

  @Prop({
    type: Number,
    required: true,
  })
  shortageInStock: number;

  @Prop({
    type: Number,
    required: true,
  })
  count: number;

  @Prop({
    type: String,
    required: true,
  })
  warehouseName: string;

  @Prop({
    type: String,
    required: true,
    enum: [
      ProductUnitEnum.NUMBER,
      ProductUnitEnum.PACKAGE,
      ProductUnitEnum.CARTON,
      ProductUnitEnum.METER,
      ProductUnitEnum.CENTIMETER,
      ProductUnitEnum.KILOGRAM,
      ProductUnitEnum.GRAM,
    ],
  })
  productUnit: string;

  @Prop({
    type: String,
    required: true,
  })
  warehouseShelfId: string;

  // *** Linked products ***
  @Prop({
    type: Array<Types.ObjectId>,
    default: [],
  })
  encourageMorePurchases: string[];

  @Prop({
    type: Array<Types.ObjectId>,
    default: [],
  })
  similarProducts: string[];

  // *** specifications product ***
  @Prop({
    type: [{ type: SpecificationsSchema }],
    default: [],
  })
  specifications: ISpecifications[];

  // *** Transportation ***
  @Prop({
    type: SizeSchema,
    required: true,
  })
  size: ISize;

  // *** SMS ***
  @Prop({
    type: Array,
    default: productSMS,
  })
  sms: SMS;

  @Prop({
    type: Number,
    default: 0,
  })
  view: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  review: boolean;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
