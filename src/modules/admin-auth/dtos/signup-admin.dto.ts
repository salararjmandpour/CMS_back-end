import { ApiProperty } from '@nestjs/swagger';

export class SignupAdminDto {
  @ApiProperty({
    type: String,
    example: 'Alireza',
  })
  first_name: string;

  @ApiProperty({
    type: String,
    example: 'Askarpour',
  })
  last_name: string;

  @ApiProperty({
    type: String,
    example: '09054538720',
  })
  mobile: string;

  @ApiProperty({
    type: String,
    example: 'askarpourdev@gmail.com',
  })
  email: string;
}
