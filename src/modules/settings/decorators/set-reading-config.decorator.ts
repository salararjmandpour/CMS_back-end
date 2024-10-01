import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { setReadingSettingsConfigValidator } from '../validators/reading-settings';

export const SetReadingConfigDecorator = () => {
  return applyDecorators(
    // SetSlugConfigDoc(),
    UseGuards(AuthGuard),
    Post('/reading'),
    UsePipes(new JoiValidatorPipe(setReadingSettingsConfigValidator)),
  );
};
