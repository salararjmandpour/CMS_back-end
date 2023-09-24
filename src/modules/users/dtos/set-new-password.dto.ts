import {
  Matches,
  IsString,
  MinLength,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetNewPasswordDto {
  @ApiProperty({
    type: String,
    default: '6470a3fbbb82534053e8bb85',
  })
  @IsMongoId()
  @IsNotEmpty()
  usreId: string;

  @ApiProperty({
    type: String,
    default: '+5^df#1sf%d4*',
  })
  @IsString()
  @IsOptional()
  @MinLength(8)
  @Matches(/^[a-zA-Z]+$/, {
    message: 'password is invalid',
  })
  password?: string;
}
