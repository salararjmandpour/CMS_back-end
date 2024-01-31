import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const GetSmsConfigDecorator = () => {
  return applyDecorators(UseGuards(AuthGuard), Get('/sms/get-config'));
};
