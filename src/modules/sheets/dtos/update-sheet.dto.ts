import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StatusEnum } from '../schema/sheet.schema';
import { UpdateSeoDto } from 'src/modules/seo/dto/update-seo.dto';

export class UpdateSheetDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsObject({
    each: true,
  })
  @IsOptional()
  description: object[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum({
    draft: StatusEnum.DRAFT,
    published: StatusEnum.PUBLISHED,
  })
  status: StatusEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;
}

export class UpdateSheetWithSeoDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateSheetDto)
  sheet: UpdateSheetDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateSeoDto)
  seo: UpdateSeoDto;
}
