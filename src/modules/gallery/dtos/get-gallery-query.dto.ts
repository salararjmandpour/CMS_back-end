import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
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
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsEnum(TypeEnum)
  type: TypeEnum;
}
