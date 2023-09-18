import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  image: any;

  @ApiProperty({
    type: String,
    required: false,
    example: 'تجهیرات پزشکی',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    required: false,
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

  count: number;
}
