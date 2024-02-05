import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { setSlugConfigValidator } from '../validators/set-slug-config.validator';

export const SetSlugConfigDecorator = () => {
  return applyDecorators(
    // ApiSetSlugConfig(),
    UseGuards(AuthGuard),
    Post('/slug'),
    UsePipes(new JoiValidatorPipe(setSlugConfigValidator)),
  );
};
