import {
  Patch,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { CheckPermission } from 'src/core/guards/check-permission.guard';

import { ApiFile } from 'src/core/decorators/api-file.decorator';

import { imageFilter } from 'src/core/utils/file-filter.util';
import { fileStorage } from 'src/core/utils/upload-storage.util';
import { ApiUploadAvatar } from '../docs/upload-avatar.dto';

export const UploadAvatarDecorator = () => {
  return applyDecorators(
    ApiTags('Profile'),
    ApiUploadAvatar(),
    ApiConsumes('multipart/form-data'),
    ApiFile('avatar'),
    UseGuards(AuthGuard),
    UseGuards(CheckPermission([])),
    Patch('upload-avatar'),
    UseInterceptors(
      FileInterceptor('avatar', {
        storage: fileStorage('avatars'),
        fileFilter: imageFilter,
      }),
    ),
  );
};
