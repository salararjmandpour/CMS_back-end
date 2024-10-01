import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { IReading } from '../schemas/reading-settings.schema';


class ReadingSettingsDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
title:string;

  @ApiProperty({ required: true })
  link: string;
}

export class SetReadingConfigDto {
  @ValidateNested()
  @ApiProperty({
    type: ReadingSettingsDto,
    default: ReadingSettingsDto,
  })
  @Type(() => ReadingSettingsDto)
  homePage: IReading;

  @ValidateNested()
  @ApiProperty({
    type: ReadingSettingsDto,
    default: ReadingSettingsDto,
  })
  @Type(() => ReadingSettingsDto)
  postsPage: IReading;


  @ValidateNested()
  @ApiProperty({
    type: ReadingSettingsDto,
    default: ReadingSettingsDto,
  })
  @Type(() => ReadingSettingsDto)
  shopPage: IReading;


}
