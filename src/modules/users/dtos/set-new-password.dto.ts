import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SetNewPasswordDto {
  @ApiProperty({
    type: String,
    default: '6470a3fbbb82534053e8bb85',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
    default: '+5^df#1sf%d4*',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
