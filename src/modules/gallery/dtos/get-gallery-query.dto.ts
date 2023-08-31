import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsJalaliDateFormat } from 'src/core/validators/jalali-date-format.validator';

export enum TypeEnum {
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  ALL = 'all',
}

export class GetGalleryQueryDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsJalaliDateFormat()
  date: string;

  @IsOptional()
  @IsEnum(TypeEnum)
  type: TypeEnum;
}
