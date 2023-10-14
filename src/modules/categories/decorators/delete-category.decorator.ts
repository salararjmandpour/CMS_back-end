import { Delete, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteCategory } from '../docs/delete-category.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { deleteCategoryValdator } from '../validators/delete-category.validator';

export const DeleteCategoryDecorator = () => {
  return applyDecorators(
    Delete(),
    ApiDeleteCategory(),
    UseGuards(AuthGuard),
    UsePipes(new JoiValidatorPipe(deleteCategoryValdator)),
  );
};
