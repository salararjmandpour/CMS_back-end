import {
  IsEnum,
  IsArray,
  IsString,
  IsObject,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../schema/post.schema';
import { CreateSeoDto } from 'src/modules/seo/dto/create-seo.dto';
import { ICategory } from '../schema/category.schema';
import { ILabels } from '../schema/labels.schema';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  writer: string;

  @ApiProperty({
    type: Object,
  })
  @IsObject({
    each: true,
  })
  @IsNotEmpty()
  description: object;

  @ApiProperty()
  @IsString()
  @IsEnum({
    draft: StatusEnum.DRAFT,
    published: StatusEnum.PUBLISHED,
  })
  status: StatusEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;

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
}

export class CreatePostWithSeoDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreatePostDto)
  post: CreatePostDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo: CreateSeoDto;
}
