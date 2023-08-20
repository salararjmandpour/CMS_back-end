import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiProperty({
    type: String,
    example: 'آرتا',
  })
  first_name: string;

  @ApiProperty({
    type: String,
    example: 'خوشبین',
  })
  last_name: string;

  @ApiProperty({
    type: String,
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
    example: 'خانه',
  })
  titleAddress: string;

  @ApiProperty({
    type: String,
    example: 'فارس',
  })
  state: string;

  @ApiProperty({
    type: String,
    example: 'شیراز',
  })
  city: string;

  @ApiProperty({
    type: String,
    example: 'فارس - شیراز - معالی آباد - خیابان نسترن 2',
  })
  postalAddress: string;

  @ApiProperty({
    type: String,
    example: '6286428652',
  })
  postalCode: string;
}
