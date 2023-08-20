import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum StatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  RETURNED = 'RETURNED',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Order {
  @Prop({
    type: Number,
  })
  orderId: number;

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  customer: Types.ObjectId;

  @Prop({
    type: Date,
  })
  orderDate: Date;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Product' }],
    ref: 'Product',
  })
  products: Types.ObjectId[];

  @Prop({
    type: Number,
  })
  totalAmount: number;

  @Prop({
    type: StatusEnum,
  })
  status: StatusEnum;

  @Prop({
    type: StatusEnum,
  })
  address: StatusEnum;

  @Prop({
    type: String,
  })
  factor: string;

  @Prop({
    type: String,
  })
  // مرحله
  level: string;

  @Prop({
    type: Date,
  })
  // زمان تحویل
  deliveryTime: Date;

  @Prop({
    type: Number,
  })
  // هزینه ارسال
  shippingCost: number;

  @Prop({
    type: Number,
  })
  // کد رهگیری
  shipmentTrackingCode: number;

  @Prop({
    type: String,
  })
  // نوع ارسال
  postType: string;

  @Prop({
    type: String,
  })
  // شیوه ارسال
  shippingMethod: string;

  @Prop({
    type: String,
  })
  paymentStatus: string;

  @Prop({
    type: Number,
  })
  postalCode: number;

  @Prop({
    type: Number,
  })
  mobile: number;

  @Prop({
    type: Number,
  })
  telephone: number;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
