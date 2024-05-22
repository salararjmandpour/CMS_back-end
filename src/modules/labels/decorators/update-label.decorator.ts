import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiUpdateLabel } from '../docs/update-label.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const UpdateLabelDecorator = () => {
  return applyDecorators(
    Patch(':id'),
    ApiUpdateLabel(),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
  );
};
