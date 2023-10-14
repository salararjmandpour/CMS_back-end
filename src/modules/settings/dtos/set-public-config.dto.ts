import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SetPublicConfigDto {
  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  timezone?: string;

  @ApiProperty({
    type: String,
    default: '',
  })
  siteTitle?: string;

  @ApiProperty({
    type: String,
    default: '',
  })
  email?: string;

  @ApiProperty({
    type: String,
    default: '',
  })
  role?: string;

  @ApiProperty({
    type: String,
    default: '64c6556e14ba201e0504a2c3',
  })
  @IsOptional()
  _id?: string;
}
