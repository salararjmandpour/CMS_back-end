import { Delete, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteCategory } from '../docs/delete-category.doc';

export const DeleteCategoryDecorator = () => {
  return applyDecorators(
    Delete(':id'),
    ApiDeleteCategory(),
    UseGuards(AuthGuard),
  );
};
