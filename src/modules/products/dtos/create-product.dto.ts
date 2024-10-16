import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSeoDto } from 'src/modules/seo/dto/create-seo.dto';
import { SMS, productSMS } from '../schema/product.schema';
import { ISpecifications } from '../schema/specification.schema';
import { ILabels } from '../schema/labels.schema';
import { ICategory } from '../schema/category.schema';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'The title for product',
    required: true,
    default: 'ﭼﺴﺐ ﺿﺪ ﺣﺴﺎﺳﯿﺖ ۱.۲۵ سانتی متر ﻣﺎرﺗﺎر',
  })
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({
    type: Object,
    description: 'The description for product',
    required: true,
  })
  description: object;

  @ApiProperty({
    type: Object,
    description: 'The shortDescription for product',
    required: true,
  })
  shortDescription: object;

  @ApiProperty({
    type: Boolean,
    description: 'The draft for product',
    default: false,
  })
  draft: boolean;

  @ApiProperty({
    type: Object,
    description: 'The category for product. Should be ObjectId',
    required: true,
    default: [
      {
        value: { _id: '65ca02157e9a66048ac09271', title: 'بدون دسته بندی'},
      },
    ],
  })
  // @IsOptional()
  category: ICategory[];


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
    description: 'The discountStartDate for product',
    default: '1403/03/26',
  })
  discountStartDate: string;

  @ApiProperty({
    type: String,
    description: 'The discountEndDate for product',
    default: '1403/03/26',
  })
  discountEndDate: string;

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
        key: { _id: '6470a3fbbb82534053e8bb86', title: 'نوع' },
        value: { _id: '6470a3fbbb82534053e8bb86', title: 'ضد حساسیت' },
      },
    ],
  })
  specifications: ISpecifications[];

  @ApiProperty({
    type: Object,
    description: 'The labels for product. Should be ObjectId',
    required: true,
    default: [
      {
        value: { _id: '6620ae4eddae531bc4b2f3cd', title: ' برچسب تستی اول' },
      },
    ],
  })
  // @IsOptional()
  labels: ILabels[];

  @ApiProperty({
    type: Object,
    description: 'The count for product',
    required: true,
    default: {
      length: 60,
      height: 20,
      width: 40,
      weight: 2,
      weightUnit: 'g',
      dimensionsUnit:'cm' ,
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
    type: String,
  })
  image: string;

  @ApiProperty({
    type: Array<String>,
  })
  images: string[];

  @ApiProperty({
    type: Array<Object>,
    default: productSMS,
  })
  sms: SMS;

  @ApiProperty()
  productId: string;
  

}

export class CreateProductWithCeoDto {
  @ApiProperty({
    type: CreateProductDto,
    default: CreateProductDto,
  })
  @ValidateNested()
  @Type(() => CreateProductDto)
  product: CreateProductDto;

  @ApiProperty({
    type: CreateSeoDto,
    default: CreateSeoDto,
  })
  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo: CreateSeoDto;
}

