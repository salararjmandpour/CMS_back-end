import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const GetSlugConfigDecorator = () => {
  return applyDecorators(
    // ApiGetSlugConfig(),
    UseGuards(AuthGuard),
    Get('/slug'),
  );
};
