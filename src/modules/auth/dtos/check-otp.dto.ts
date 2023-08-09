import { ApiProperty } from '@nestjs/swagger';

export class CheckOtpDto {
  @ApiProperty({
    description: 'The mobile or email for check otp',
    type: String,
    required: true,
    example: '09054538720',
  })
  field: string;

  @ApiProperty({
    description: 'The code for check otp',
    type: String,
    required: true,
    example: '245639',
  })
  code: string;
}
