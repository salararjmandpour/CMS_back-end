import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { SetSlugConfigDoc } from '../docs/set-slug-config.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { setSlugConfigValidator } from '../validators/set-slug-config.validator';

export const SetSlugConfigDecorator = () => {
  return applyDecorators(
    SetSlugConfigDoc(),
    UseGuards(AuthGuard),
    Post('/slug'),
    UsePipes(new JoiValidatorPipe(setSlugConfigValidator)),
  );
};
