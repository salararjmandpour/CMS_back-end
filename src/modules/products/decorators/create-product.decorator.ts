import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createProductValidator } from '../validators/create-product.validator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCreateProduct } from '../docs/create-product.doc';

export const CreateProductDecorator = () => {
  return applyDecorators(
    UsePipes(new JoiValidatorPipe(createProductValidator)),
    UseGuards(AuthGuard),
    ApiCreateProduct(),
    Post(),
  );
};
