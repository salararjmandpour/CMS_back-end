import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { setPublicConfigValidator } from '../validators/set-public-config.validator';

export const SetPublicConfigDecorator = () => {
  return applyDecorators(
    Post('/public/set-config'),
    UsePipes(new JoiValidatorPipe(setPublicConfigValidator)),
  );
};
