import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../schema/order.schema';

export class CreateOrderDto {
  @ApiProperty({
    type: [String],
    required: true,
    default: [
      '64e006bca31462ff14ff4410',
      '64e006bca31462ff14ff440e',
      '64e006bca31462ff14ff440d',
    ],
  })
  products: string[];

  @ApiProperty({
    type: String,
    required: true,
    default: '64e006bca31462ff14ff440c',
  })
  address: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  shippingMethod: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  shippingCost: number;

  @ApiProperty({
    type: String,
    required: true,
    enum: ['paid', 'unpaid'],
  })
  paymentStatus: string;

  orderId: number;

  customer: string;

  orderDate: string;

  totalAmount: number;

  status: StatusEnum;

  factor: string;

  deliveryTime: string;
}
