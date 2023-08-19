import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiUpdateCategory } from '../docs/update-category.doc';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const UpdateCategoryDecorator = () => {
  return applyDecorators(
    Patch(':id'),
    ApiUpdateCategory(),
    UseGuards(AuthGuard),
  );
};
