import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const GetEmailConfigDecorator = () => {
  return applyDecorators(UseGuards(AuthGuard), Get('/email/get-config'));
};
