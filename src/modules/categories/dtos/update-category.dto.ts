import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { UpdateSeoDto } from 'src/modules/seo/dto/update-seo.dto';

export class UpdateCategoryDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'تجهیرات پزشکی',
  })
  title: string;

  @ApiProperty({
    type: String,
    required: false,
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

  count: number;
  image: any;
}

export class UpdateCategoryWithDto {
  @ApiProperty({
    type: UpdateCategoryDto,
    default: UpdateCategoryDto,
  })
  @ValidateNested()
  @Type(() => UpdateCategoryDto)
  category: UpdateCategoryDto;

  @ApiProperty({
    type: UpdateSeoDto,
    default: UpdateSeoDto,
  })
  @ValidateNested()
  @Type(() => UpdateSeoDto)
  seo: UpdateSeoDto;
}
