import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/modules/products/schema/product.schema';
import { Category } from 'src/modules/categories/schemas/category.schema';

export enum DiscountTypeEnum {
  PERCENTAGE_DISCOUNT = 'PERCENTAGE_DISCOUNT',
  FIXED_PRODUCT_DISCOUNT = 'FIXED_PRODUCT_DISCOUNT',
  FIXED_SHOPPING_CART_DISCOUNT = 'FIXED_SHOPPING_CART_DISCOUNT',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class DiscountCode {
  @Prop({
    type: String,
    required: true,
  })
  discountCode: string;

  @Prop({
    type: String,
    default: '',
  })
  description: string;

  @Prop({
    type: Number,
    default: 0,
  })
  used: number;

  // *** Discount Iformation ***

  @Prop({
    type: String,
    required: true,
    enum: [
      DiscountTypeEnum.PERCENTAGE_DISCOUNT,
      DiscountTypeEnum.FIXED_PRODUCT_DISCOUNT,
      DiscountTypeEnum.FIXED_SHOPPING_CART_DISCOUNT,
    ],
  })
  type: DiscountTypeEnum;

  @Prop({
    type: Number,
    default: 0,
  })
  discountPercentage: number;

  @Prop({
    type: Date,
  })
  expireDate: Date;

  // *** Access Restrictions ***

  @Prop({
    type: Number,
    default: null,
  })
  minCost: number;

  @Prop({
    type: Number,
    default: null,
  })
  maxCost: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  individualUse: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  exceptBestsellerProduct: boolean;

  @Prop({
    type: Array<Types.ObjectId>,
    default: [],
    ref: Product.name,
  })
  products: string[];

  @Prop({
    type: Array<Types.ObjectId>,
    default: [],
    ref: Product.name,
  })
  exceptProducts: string[];

  @Prop({
    type: Array<Types.ObjectId>,
    default: [],
    ref: Category.name,
  })
  categories: string[];

  @Prop({
    type: Array<Types.ObjectId>,
    default: [],
    ref: Category.name,
  })
  exceptCategirues: string[];

  // *** Usage Limitation ***

  @Prop({
    type: Number,
    default: null,
  })
  maxUse: number;

  @Prop({
    type: Number,
    default: null,
  })
  XItemUseLimit: number;

  @Prop({
    type: Number,
    default: null,
  })
  userConsumptionLimit: number;
}

export type DiscountCodeDocument = Document & DiscountCode;
export const DiscountCodeSchema = SchemaFactory.createForClass(DiscountCode);
