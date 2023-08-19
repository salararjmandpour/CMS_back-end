import { ApiProperty } from '@nestjs/swagger';

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
  name: string;

  @ApiProperty({
    type: Boolean,
    default: false,
  })
  disabled: boolean;

  @ApiProperty({
    type: String,
    example: '6470a3fbbb82534053e8bb86',
  })
  parent?: string;
}
