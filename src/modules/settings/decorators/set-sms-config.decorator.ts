import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { setSmsConfigValidator } from '../validators/set-sms-config.validator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { SetSmsConfigDoc } from '../docs/set-sms-config.doc';

export const SetSmsConfigDecorator = () => {
  return applyDecorators(
    SetSmsConfigDoc(),
    UseGuards(AuthGuard),
    UsePipes(new JoiValidatorPipe(setSmsConfigValidator)),
    Post('/sms'),
  );
};
