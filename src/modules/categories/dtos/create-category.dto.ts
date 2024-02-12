import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { CreateSeoDto } from 'src/modules/seo/dto/create-seo.dto';
import { TypeEnum } from '../schemas/category.schema';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'تجهیرات پزشکی',
  })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'medical-equipment',
  })
  slug: string;

  @ApiProperty({
    type: String,
    default: '',
  })
  description: string;

  @ApiProperty({
    type: String,
    example: '6470a3fbbb82534053e8bb86',
    required: false,
  })
  parent: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  type: TypeEnum;

  count: number;
  supplier?: string;
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
