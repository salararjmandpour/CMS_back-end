import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, ValidateNested } from 'class-validator';
import { ISlug } from '../schemas/slug-settings.schema';

export enum LinkStructuresEnum {
  SIMPLE = 'simple',
  CUSTOM = 'custom',
}

class SlugSettingsDto {
  @ApiProperty()
  category: string;

  @ApiProperty({
    default: LinkStructuresEnum.SIMPLE,
  })
  @IsEnum(LinkStructuresEnum)
  linkStructures: LinkStructuresEnum;

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
  postLabelSettings: ISlug;

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
  productLabelSettings: ISlug;
}
