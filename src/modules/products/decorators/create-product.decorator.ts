import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createProductWithDeoValidator } from '../validators/create-product.validator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCreateProduct } from '../docs/create-product.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const CreateProductDecorator = () => {
  return applyDecorators(
    UsePipes(new JoiValidatorPipe(createProductWithDeoValidator)),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    ApiCreateProduct(),
    Post(),
  );
};
