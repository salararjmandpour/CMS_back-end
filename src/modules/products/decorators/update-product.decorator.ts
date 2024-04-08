import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { UpdateProductDoc } from '../docs/update-product.doc';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const UpdateProductDecorator = () => {
  return applyDecorators(
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    UpdateProductDoc(),
    Patch(':id'),
  );
};
