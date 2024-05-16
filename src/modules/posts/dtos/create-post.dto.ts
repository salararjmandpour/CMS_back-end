import {
  IsEnum,
  IsArray,
  IsString,
  IsObject,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
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
  slug: string;

  @ApiProperty({
    type: Object,
  })
  @IsObject({
    each: true,
  })
  @IsNotEmpty()
  description: object;

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
