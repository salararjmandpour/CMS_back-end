import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { GetSlugConfigDoc } from '../docs/get-slug-config.doc';

export const GetSlugConfigDecorator = () => {
  return applyDecorators(
    GetSlugConfigDoc(),
    UseGuards(AuthGuard),
    Get('/slug'),
  );
};
