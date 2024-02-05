import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { SetEmailConfigDoc } from '../docs/set-email-config.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { setEmailConfigValidator } from '../validators/set-email-config.validator';

export const SetEmailConfigDecorator = () => {
  return applyDecorators(
    SetEmailConfigDoc(),
    UseGuards(AuthGuard),
    UsePipes(new JoiValidatorPipe(setEmailConfigValidator)),
    Post('/email'),
  );
};
