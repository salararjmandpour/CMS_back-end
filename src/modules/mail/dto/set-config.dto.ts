import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SetConfigDto {
  @ApiProperty({
    type: String,
    required: true,
    default: 'irweb.ir',
  })
  host: string;

  @ApiProperty({
    type: String,
    required: true,
    default: '354',
  })
  port: string;

  @ApiProperty({
    type: String,
    required: true,
    default: 'test@irweb.ir',
  })
  user: string;

  @ApiProperty({
    type: String,
    required: true,
    default: 'D9)F?d4%6Q&5',
  })
  pass: string;

  @ApiProperty({
    type: String,
    required: true,
    default: 'test@test.com',
  })
  senderEmail: string;

  @ApiProperty({
    type: String,
    required: true,
    default: '64c6556e14ba201e0504a2c3',
  })
  @IsOptional()
  _id: string;
}
