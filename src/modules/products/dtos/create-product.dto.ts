import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    type: Number,
    description: 'The productId for product',
    required: true,
    default: 'MT015',
  })
  productId: number;

  @ApiProperty({
    type: String,
    description: 'The title for product',
    required: true,
    default: 'ﭼﺴﺐ ﺿﺪ ﺣﺴﺎﺳﯿﺖ ۱.۲۵ سانتی متر ﻣﺎرﺗﺎ',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'The description for product',
    required: true,
  })
  description: string;

  @ApiProperty({
    type: String,
    description: 'The shortDescription for product',
    required: true,
  })
  shortDescription: string;

  @ApiProperty({
    type: Number,
    description: 'The shortDescription for product',
    required: true,
    default: 250_000,
  })
  price: number;

  @ApiProperty({
    type: Number,
    description: 'The discount for product',
    required: true,
    default: 0,
  })
  discount: number;

  @ApiProperty({
    type: Number,
    description: 'The count for product',
    required: true,
  })
  count: number;

  @ApiProperty({
    type: Object,
    description: 'The count for product',
    required: true,
    default: {
      length: 60,
      height: 20,
      width: 40,
      weight: 2,
      weightUnit: 'kg',
      dimensionsUnit: 'cm',
    },
  })
  size: {
    length: number;
    height: number;
    width: number;
    weight: number;
    weightUnit: 'g' | 'kg';
    dimensionsUnit: 'cm' | 'm';
  };

  @ApiProperty({
    type: Boolean,
    description: 'The inStock for product',
    required: true,
  })
  inStock: boolean;

  @ApiProperty({
    type: String,
    description: 'The category for product. Should be ObjectId',
    required: true,
    default: '6470a3fbbb82534053e8bb86',
  })
  category: string;

  @ApiProperty({
    type: Object,
    description: 'The category for product. Should be ObjectId',
    required: true,
    default: {
      key: 'نوع',
      value: 'ضد حساسیت',
    },
  })
  specifications: {
    key: string;
    value: string;
  };

  supplier: string;
}
