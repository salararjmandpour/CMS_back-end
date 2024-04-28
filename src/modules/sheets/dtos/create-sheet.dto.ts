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
  @ApiProperty({
    example: 'string',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: {
      key: 'value',
    },
  })
  @IsOptional()
  @IsObject({
    each: true,
  })
  description: object[];

  @ApiProperty({
    example: 'published',
  })
  @IsString()
  @IsEnum({
    draft: StatusEnum.DRAFT,
    published: StatusEnum.PUBLISHED,
  })
  @IsNotEmpty()
  status: StatusEnum;

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    example:'string'
  })
  @IsString()
  @IsNotEmpty()
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
