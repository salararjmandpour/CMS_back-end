import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
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
    type: String,
    required: true,
    example: '09054538720',
  })
  mobile: string;

  @ApiProperty({
    type: String,
    example: '02191093003',
  })
  telephone: string;

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
    type: String,
    required: true,
    example: '6286428652',
  })
  postalCode: string;
}
