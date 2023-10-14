import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { setEmailConfigValidator } from '../validators/set-email-config.validator';

export const SetEmailConfigDecorator = () => {
  return applyDecorators(
    Post('/email/set-config'),
    UsePipes(new JoiValidatorPipe(setEmailConfigValidator)),
  );
};
