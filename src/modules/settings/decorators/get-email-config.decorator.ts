import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { GetEmailConfigDoc } from '../docs/get-email-config.doc';

export const GetEmailConfigDecorator = () => {
  return applyDecorators(
    GetEmailConfigDoc(),
    UseGuards(AuthGuard),
    Get('/email'),
  );
};
