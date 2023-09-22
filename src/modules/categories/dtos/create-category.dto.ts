import {
  IsString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSeoDto } from 'src/modules/seo/dto/create-seo.dto';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'تجهیرات پزشکی',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'medical-equipment',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    type: String,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    example: '6470a3fbbb82534053e8bb86',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  parent: string;

  image: any;
  count: number;
}

export class CreateCategoryWithSeoDto {
  @ApiProperty({
    type: CreateCategoryDto,
    default: CreateCategoryDto,
  })
  @ValidateNested()
  @Type(() => CreateCategoryDto)
  category: CreateCategoryDto;

  @ApiProperty({
    type: CreateSeoDto,
    default: CreateSeoDto,
  })
  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo: CreateSeoDto;
}
