import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { setPublicConfigValidator } from '../validators/set-public-config.validator';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const SetPublicConfigDecorator = () => {
  return applyDecorators(
    UseGuards(AuthGuard),
    Post('/public'),
    UsePipes(new JoiValidatorPipe(setPublicConfigValidator)),
  );
};
