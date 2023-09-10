import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty({
    type: String,
    example: '',
  })
  encryptedData: string;
}
