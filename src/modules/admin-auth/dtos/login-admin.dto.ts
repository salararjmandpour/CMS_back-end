import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty({
    description: 'Enter email or username for admin login',
    required: true,
    type: String,
    example: 'askarpourdev@gmail.com',
  })
  field: string;

  @ApiProperty({
    description: 'Enter password for admin login',
    required: true,
    type: String,
    example: 'qKw4k*Z&',
  })
  password: string;
}
