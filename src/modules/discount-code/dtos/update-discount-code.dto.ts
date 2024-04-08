import {
  IsEnum,
  IsArray,
  IsNumber,
  IsString,
  IsMongoId,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DiscountTypeEnum } from '../schemas/discount-code.schema';

export class UpdateDiscountCodeDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  discountCode: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  // *** Discount Iformation ***

  @ApiProperty()
  @IsEnum(DiscountTypeEnum)
  @IsOptional()
  type: DiscountTypeEnum;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  discountPercentage: number;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  expireDate: Date;

  // *** Access Restrictions ***

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  minCost: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  maxCost: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  individualUse: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  exceptBestsellerProduct: boolean;

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  products: string[];

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  exceptProducts: string[];

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  categories: string[];

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  exceptCategirues: string[];

  // *** Usage Limitation ***

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  maxUse: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  XItemUseLimit: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  userConsumptionLimit: number;
}
