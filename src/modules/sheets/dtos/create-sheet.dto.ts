import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsObject,
  IsOptional,
} from 'class-validator';
import { StatusEnum } from '../schema/sheet.schema';
import { CreateSeoDto } from 'src/modules/seo/dto/create-seo.dto';

export class CreateSheetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsObject({
    each: true,
  })
  @IsNotEmpty()
  description: object[];

  @ApiProperty()
  @IsString()
  @IsEnum({
    draft: StatusEnum.DRAFT,
    published: StatusEnum.PUBLISHED,
  })
  status: StatusEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug: string;
}

export class CreateSheetWithSeoDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateSheetDto)
  sheet: CreateSheetDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo: CreateSeoDto;
}
