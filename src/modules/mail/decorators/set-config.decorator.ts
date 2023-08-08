import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { setConfigValidator } from '../validators/set-config.validator';

export const SetConfigDecorator = () => {
  return applyDecorators(
    Post('set-config'),
    UsePipes(new JoiValidatorPipe(setConfigValidator)),
  );
};
