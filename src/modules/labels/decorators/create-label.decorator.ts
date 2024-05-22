import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCreateLabel } from '../docs/create-label.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createLabelValidator } from '../validators/create-label.validator';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const CreateLabelDecorator = () => {
  return applyDecorators(
    Post(),
    ApiCreateLabel(),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    UsePipes(new JoiValidatorPipe(createLabelValidator)),
  );
};
