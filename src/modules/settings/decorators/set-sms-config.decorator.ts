import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { setSmsConfigValidator } from '../validators/set-sms-config.validator';

export const SetSmsConfigDecorator = () => {
  return applyDecorators(
    Post('/sms/set-config'),
    UsePipes(new JoiValidatorPipe(setSmsConfigValidator)),
  );
};
