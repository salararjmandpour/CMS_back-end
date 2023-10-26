import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCreateCategory } from '../docs/create-category.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createCategoryValidator } from '../validators/create-category.validator';

export const CreateCategoryDecorator = () => {
  return applyDecorators(
    Post(),
    ApiCreateCategory(),
    UseGuards(AuthGuard),
    UsePipes(new JoiValidatorPipe(createCategoryValidator)),
  );
};
