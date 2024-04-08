import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export enum TypeEnum {
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  FILE = 'file',
  ALL = 'all',
}

export class GetGalleryQueryDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsEnum(TypeEnum)
  type: TypeEnum;
}
