import { ApiTags } from '@nestjs/swagger';
import { Patch, UseGuards, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiUpdateUser } from '../docs/update-user.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const UpdateUserDecorator = () => {
  return applyDecorators(
    Patch(':id'),
    ApiUpdateUser(),
    ApiTags('Users'),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
  );
};
