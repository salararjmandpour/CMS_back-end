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
  password: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  token: string;
}
