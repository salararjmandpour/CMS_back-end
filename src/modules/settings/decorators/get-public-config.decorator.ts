import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const GetPublicConfigDecorator = () => {
  return applyDecorators(UseGuards(AuthGuard), Get('/public'));
};
