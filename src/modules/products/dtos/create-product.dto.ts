import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateProductDto {
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
    type: Boolean,
    description: 'The draft for product',
    default: false,
  })
  draft: boolean;

  @ApiProperty({
    type: Array<String>,
    description: 'The category for product. Should be ObjectId',
    required: true,
    default: ['6470a3fbbb82534053e8bb86'],
  })
  category: string[];

  @ApiProperty({
    type: Number,
    description: 'The regularPrice for product',
    required: true,
    default: 250_000,
  })
  regularPrice: number;

  @ApiProperty({
    type: Number,
    description: 'The regularPrice for product',
    default: 250_000,
  })
  discountedPrice: number;

  @ApiProperty({
    type: String,
    description: 'The discountDate for product',
    default: '1403/03/26',
  })
  discountDate: string;

  @ApiProperty({
    type: String,
    description: 'The productId for product',
    required: true,
    default: 'MT015',
  })
  productId: string;

  @ApiProperty({
    type: Boolean,
    description: 'The inStock for product',
  })
  inStock: boolean;

  @ApiProperty({
    type: Number,
    description: 'The inStock for product',
    required: true,
  })
  shortageInStock: number;

  @ApiProperty({
    type: Number,
    description: 'The count for product',
    required: true,
  })
  count: number;

  @ApiProperty({
    type: String,
    description: 'The warehouseName for product',
    required: true,
  })
  warehouseName: string;

  @ApiProperty({
    type: String,
    description: 'The productUnit for product',
    required: true,
    default: 'number',
  })
  productUnit: string;

  @ApiProperty({
    type: String,
    description: 'The warehouseShelfId for product',
    required: true,
  })
  warehouseShelfId: string;

  @ApiProperty({
    type: Array<String>,
    description:
      'The encourageMorePurchases for product. Should be list from ObjectId',
    required: true,
    default: ['6470a3fbbb82534053e8bb86'],
  })
  encourageMorePurchases: string[];

  @ApiProperty({
    type: Array<String>,
    description:
      'The similarProducts for product. Should be list from ObjectId',
    required: true,
    default: ['6470a3fbbb82534053e8bb86'],
  })
  similarProducts: string[];

  @ApiProperty({
    type: Object,
    description: 'The specifications for product. Should be ObjectId',
    required: true,
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

  @ApiProperty({
    type: Object,
    description: 'The count for product',
    required: true,
    default: {
      length: 60,
      height: 20,
      width: 40,
      weight: 2,
      weightUnit: 'gram' || 'kilogram',
      dimensionsUnit: 'centimeter' || 'meter',
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

  supplier: string;
  images: string[];
}

export class CreateProductWithCeoDto {
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  product: CreateProductDto;
  
  seo: {}
}
