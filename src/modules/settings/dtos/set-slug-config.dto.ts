import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, ValidateNested } from 'class-validator';
import { ISlug } from '../schemas/slug-settings.schema';

enum LinkeStructuresEnum {
  SIMPLE = 'simple',
  CUSTOM = 'custom',
}

class SlugSettingsDto {
  @ApiProperty()
  category: string;

  @ApiProperty()
  @IsEnum(LinkeStructuresEnum)
  linkeStructures: LinkeStructuresEnum;

  @ApiProperty()
  link: string;
}

export class SetSlugCnfigDto {
  @ValidateNested()
  @ApiProperty()
  @Type(() => SlugSettingsDto)
  postSettings: ISlug;

  @ValidateNested()
  @ApiProperty()
  @Type(() => SlugSettingsDto)
  postLableSettings: ISlug;

  @ValidateNested()
  @ApiProperty()
  @Type(() => SlugSettingsDto)
  productSettings: ISlug;

  @ValidateNested()
  @ApiProperty()
  @Type(() => SlugSettingsDto)
  productLableSettings: ISlug;
}
