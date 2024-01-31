import { Delete, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteMantUser } from '../docs/delete-many-user.doc';
import { ApiTags } from '@nestjs/swagger';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const DeleteManyUserDecorator = () => {
  return applyDecorators(
    Delete(),
    ApiTags('Users'),
    ApiDeleteMantUser(),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
  );
};
