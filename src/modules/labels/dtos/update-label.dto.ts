import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateSeoDto } from 'src/modules/seo/dto/create-seo.dto';

export class UpdateLabelDto {
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
  description: object;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;
}



export class UpdateLabelWithSeoDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateLabelDto)
  label: UpdateLabelDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo: CreateSeoDto;
}
