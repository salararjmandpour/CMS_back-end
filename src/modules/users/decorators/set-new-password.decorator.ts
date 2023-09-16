import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiSetNewPassword } from '../docs/set-new-password.doc';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

export const SetNewPasswordDecorator = () => {
  return applyDecorators(
    Patch('set-new-password'),
    UseGuards(AuthGuard),
    ApiSetNewPassword(),
    ApiTags('Users'),
  );
};
