import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UpdateSeoDto } from 'src/modules/seo/dto/update-seo.dto';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {
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
    type: Boolean,
    description: 'The draft for product',
    default: false,
  })
  draft: boolean;

  @ApiProperty({
    type: String,
    description: 'The category for product. Should be array from ObjectId',
    default: ['6470a3fbbb82534053e8bb86'],
  })
  category: string;

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

  discount: number;

  @ApiProperty({
    type: String,
    description: 'The discountDate for product',
    default: '1403/03/26',
  })
  discountDate: string;

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
    description: 'The specifications for product. Should be array from objects',
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
    default: {
      length: 60,
      height: 20,
      width: 40,
      weight: 2,
      weightUnit: 'kilogram',
      dimensionsUnit: 'centimeter',
    },
  })
  size: {
    length: number;
    height: number;
    width: number;
    weight: number;
    weightUnit: 'kilogram' | 'gram';
    dimensionsUnit: 'centimeter' | 'meter';
  };

  images: string[];
}

export class UpdateProductWithSeoDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateProductDto)
  product: UpdateProductDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateSeoDto)
  seo: UpdateSeoDto;
}
