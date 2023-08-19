import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiCreateCategory } from '../docs/create-category.doc';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const CreateCategoryDecorator = () => {
  return applyDecorators(Post(), ApiCreateCategory(), UseGuards(AuthGuard));
};
