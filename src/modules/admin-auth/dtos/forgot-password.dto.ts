import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    type: String,
    example: 'askarpourdev@gmail.com',
  })
  email: string;
}

export class PostResetPasswordDto {
  @ApiProperty({
    type: String,
    example: '',
  })
  encryptedData: string;
}
