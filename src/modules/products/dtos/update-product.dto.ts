import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    type: String,
    description: 'The productId for product',
    default: 'MT015',
  })
  productId: string;

  @ApiProperty({
    type: String,
    description: 'The title for product',
    default: 'ﭼﺴﺐ ﺿﺪ ﺣﺴﺎﺳﯿﺖ ۱.۲۵ سانتی متر ﻣﺎرﺗﺎ',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'The description for product',
  })
  description: string;

  @ApiProperty({
    type: String,
    description: 'The shortDescription for product',
  })
  shortDescription: string;

  @ApiProperty({
    type: Number,
    description: 'The slug for product',
    default: 'chasbe-zed-hasasiat-marta',
  })
  slug: string;

  @ApiProperty({
    type: Number,
    description: 'The shortDescription for product',
    default: 250_000,
  })
  price: number;

  @ApiProperty({
    type: Number,
    description: 'The discount for product',
    default: 0,
  })
  discount: number;

  @ApiProperty({
    type: Number,
    description: 'The count for product',
  })
  count: number;

  @ApiProperty({
    type: Object,
    description: 'The count for product',
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
  })
  inStock: boolean;

  @ApiProperty({
    type: String,
    description: 'The category for product. Should be ObjectId',
    default: '6470a3fbbb82534053e8bb86',
  })
  category: string;

  @ApiProperty({
    type: Object,
    description: 'The category for product. Should be ObjectId',
    default: [
      {
        key: 'نوع',
        value: 'ضد حساسیت',
      },
    ],
  })
  specifications: {
    key: string;
    value: string;
  }[];

  supplier: string;
}
