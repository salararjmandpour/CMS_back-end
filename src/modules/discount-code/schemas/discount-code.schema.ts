import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum DiscountTypeEnum {
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

  //   Discount information
  @Prop({
    type: String,
    enum: [
      DiscountTypeEnum.PERCENTAGE_DISCOUNT,
      DiscountTypeEnum.FIXED_PRODUCT_DISCOUNT,
      DiscountTypeEnum.FIXED_SHOPPING_CART_DISCOUNT,
    ],
  })
  type: DiscountTypeEnum;
}

export type DiscountCodeDocument = Document & DiscountCode;
export const DiscountCodeSchema = SchemaFactory.createForClass(DiscountCode);
