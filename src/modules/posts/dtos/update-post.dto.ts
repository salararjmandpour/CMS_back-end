import {
  IsEnum,
  IsArray,
  IsString,
  IsMongoId,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../schema/post.schema';
import { CreateSeoDto } from 'src/modules/seo/dto/create-seo.dto';

export class UpdatePostDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsEnum({
    draft: StatusEnum.DRAFT,
    published: StatusEnum.PUBLISHED,
  })
  status: StatusEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  categories: string[];
}

export class UpdatePostWithSeoDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdatePostDto)
  post: UpdatePostDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo: CreateSeoDto;
}
