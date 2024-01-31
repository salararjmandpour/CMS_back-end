import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiGetPublicConfig } from '../docs/get-public-config.doc';

export const GetPublicConfigDecorator = () => {
  return applyDecorators(
    ApiGetPublicConfig(),
    UseGuards(AuthGuard),
    Get('/public'),
  );
};
