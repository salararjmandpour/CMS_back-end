import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteAvatar } from '../docs/delete-avatar.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const DeleteAvatarDecorator = () => {
  return applyDecorators(
    Patch('delete-avatar'),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    ApiTags('Profile'),
    ApiDeleteAvatar(),
  );
};
