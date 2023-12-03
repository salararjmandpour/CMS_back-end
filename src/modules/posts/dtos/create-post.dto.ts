import {
  IsEnum,
  IsArray,
  IsString,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../schema/post.schema';
import { CreateSeoDto } from 'src/modules/seo/dto/create-seo.dto';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  categories: string[];
}

export class CreatePostWithSeoDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreatePostDto)
  post: CreatePostDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateSeoDto)
  seo: CreateSeoDto;
}
