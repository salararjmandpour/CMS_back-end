import { ApiProperty } from '@nestjs/swagger';

export class GetOtpDto {
  @ApiProperty({
    description: 'Enter mobile or email for get otp',
    type: String,
    required: true,
    example: '09054538720',
  })
  field: string;
}
