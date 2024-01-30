import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { ApiSetPublicConfig } from '../docs/set-public-config.doc';
import { setPublicConfigValidator } from '../validators/set-public-config.validator';

export const SetPublicConfigDecorator = () => {
  return applyDecorators(
    ApiSetPublicConfig(),
    UseGuards(AuthGuard),
    Post('/public'),
    UsePipes(new JoiValidatorPipe(setPublicConfigValidator)),
  );
};
