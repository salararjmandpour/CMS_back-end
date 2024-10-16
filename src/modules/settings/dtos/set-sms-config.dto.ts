import { ApiProperty } from '@nestjs/swagger';

export class SetSmsConfigDto {
  @ApiProperty({
    type: String,
    required: true,
    default: 'farazsms.ir',
  })
  panel: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    default: '51csvs4s5d',
  })
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    default: '+985000404223',
  })
  senderNumber: string;
}
