import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSeoDto } from 'src/modules/seo/dto/create-seo.dto';


export enum TypeEnum {
  PRODUCT = 'product',
  POST = 'post',
}

export class CreateLabelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsObject({
    each: true,
  })
  @IsOptional()
  description: object;

  @ApiProperty()
  @IsString()
  type: TypeEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;
}

export class CreateLabeWithSeoDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateLabelDto)
  label: CreateLabelDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo: CreateSeoDto;
}
