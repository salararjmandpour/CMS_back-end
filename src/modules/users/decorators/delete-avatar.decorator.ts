import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteAvatar } from '../docs/delete-avatar.doc';

export const DeleteAvatarDecorator = () => {
  return applyDecorators(
    Patch('delete-avatar'),
    UseGuards(AuthGuard),
    ApiTags('Profile'),
    ApiDeleteAvatar(),
  );
};
