import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, ValidateNested } from 'class-validator';
import { ISlug } from '../schemas/slug-settings.schema';

export enum LinkeStructuresEnum {
  SIMPLE = 'simple',
  CUSTOM = 'custom',
}

class SlugSettingsDto {
  @ApiProperty()
  category: string;

  @ApiProperty({
    default: LinkeStructuresEnum.SIMPLE,
  })
  @IsEnum(LinkeStructuresEnum)
  linkeStructures: LinkeStructuresEnum;

  @ApiProperty()
  link: string;
}

export class SetSlugCnfigDto {
  @ValidateNested()
  @ApiProperty({
    type: SlugSettingsDto,
    default: SlugSettingsDto,
  })
  @Type(() => SlugSettingsDto)
  postSettings: ISlug;

  @ValidateNested()
  @ApiProperty({
    type: SlugSettingsDto,
    default: SlugSettingsDto,
  })
  @Type(() => SlugSettingsDto)
  postLableSettings: ISlug;

  @ValidateNested()
  @ApiProperty({
    type: SlugSettingsDto,
    default: SlugSettingsDto,
  })
  @Type(() => SlugSettingsDto)
  productSettings: ISlug;

  @ValidateNested()
  @ApiProperty({
    type: SlugSettingsDto,
    default: SlugSettingsDto,
  })
  @Type(() => SlugSettingsDto)
  productLableSettings: ISlug;
}
