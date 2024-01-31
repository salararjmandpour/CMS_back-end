import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiUpdateCategory } from '../docs/update-category.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const UpdateCategoryDecorator = () => {
  return applyDecorators(
    Patch(':id'),
    ApiUpdateCategory(),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
  );
};
