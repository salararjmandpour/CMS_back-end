import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SetNewPasswordDto {
  @ApiProperty({
    type: String,
    default: '6470a3fbbb82534053e8bb85',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
    default: '+5^df#1sf%d4*',
  })
  @IsString()
  @IsOptional()
  password: string;
}
