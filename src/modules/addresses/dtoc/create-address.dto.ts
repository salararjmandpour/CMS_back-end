import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '6470a3fbbb82534053e8bb86',
  })
  user: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'آرتا',
  })
  first_name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'خوشبین',
  })
  last_name: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: '09054538720',
  })
  mobile: number;

  @ApiProperty({
    type: Number,
    example: '02191093003',
  })
  telephone: number;

  @ApiProperty({
    type: String,
    required: true,
    example: 'خانه',
  })
  titleAddress: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'فارس',
  })
  state: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'شیراز',
  })
  city: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'فارس - شیراز - معالی آباد - خیابان نسترن 2',
  })
  postalAddress: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: '6286428652',
  })
  postalCode: number;
}
