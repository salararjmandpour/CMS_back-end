import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { GetSmsConfigDoc } from '../docs/get-sms-config.doc';

export const GetSmsConfigDecorator = () => {
  return applyDecorators(GetSmsConfigDoc(), UseGuards(AuthGuard), Get('/sms'));
};
