import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const GetReadingConfigDecorator = () => {
  return applyDecorators(
    // GetSlugConfigDoc(),
    UseGuards(AuthGuard),
    Get('/reding'),
  );
};
