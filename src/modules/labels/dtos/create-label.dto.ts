import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { CreateSeoDto } from 'src/modules/seo/dto/create-seo.dto';
import { TypeEnum } from '../schemas/label.schema';

export class CreateLabelDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'تجهیرات پزشکی',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'medical-equipment',
  })
  slug: string;

  @ApiProperty({
    type: Object,
    default: {"key": "value"},
  })
  description: Object;

  supplier?: string;


  @ApiProperty()
  image: string;

  @ApiProperty()
  type: TypeEnum;

  idUrl?: string;
  slugUrl?: string;
}

export class CreateLabelWithSeoDto {
  @ApiProperty({
    type: CreateLabelDto,
    default: CreateLabelDto,
  })
  @ValidateNested()
  @Type(() => CreateLabelDto)
  label: CreateLabelDto;

  @ApiProperty({
    type: CreateSeoDto,
    default: CreateSeoDto,
  })
  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo: CreateSeoDto;
}
