import { Delete, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteLabel } from '../docs/delete-label.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { deleteLabelValidator } from '../validators/delete-label.validator';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const DeleteLabelDecorator = () => {
  return applyDecorators(
    Delete(),
    ApiDeleteLabel(),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    UsePipes(new JoiValidatorPipe(deleteLabelValidator)),
  );
};
