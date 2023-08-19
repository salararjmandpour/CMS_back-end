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
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
