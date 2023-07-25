import { ApiProperty } from '@nestjs/swagger';

export class GetOtpDto {
  @ApiProperty({
    description: 'The mobile for get otp',
    type: String,
    required: true,
    example: '09054538720',
  })
  mobile: string;
}
