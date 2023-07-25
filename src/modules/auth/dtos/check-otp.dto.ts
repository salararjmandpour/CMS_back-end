import { ApiProperty } from '@nestjs/swagger';

export class CheckOtpDto {
  @ApiProperty({
    description: 'The mobile for check otp',
    type: String,
    required: true,
    example: '09054538720',
  })
  mobile: string;

  @ApiProperty({
    description: 'The code for check otp',
    type: String,
    required: true,
    example: '245639',
  })
  code: string;
}
