import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { nanoidNumber } from 'src/core/utils/nanoid.util';

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
    default: nanoidNumber(12),
    required: true,
  })
  orderId: number;

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  customer: Types.ObjectId;

  @Prop({
    type: Date,
    default: Date.now(),
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
    type: String,
    default: StatusEnum.IN_PROGRESS,
    enum: [
      StatusEnum.IN_PROGRESS,
      StatusEnum.COMPLETED,
      StatusEnum.CANCELED,
      StatusEnum.RETURNED,
    ],
  })
  status: string;

  @Prop({
    type: Types.ObjectId,
  })
  address: string;

  @Prop({
    type: String,
  })
  factor: string;

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
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
