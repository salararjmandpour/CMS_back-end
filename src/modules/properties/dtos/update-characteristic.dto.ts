import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCharacteristicDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // color: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;
}
