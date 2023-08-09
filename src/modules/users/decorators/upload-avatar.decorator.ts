import {
  Post,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { CheckPermission } from 'src/core/guards/check-permission.guard';

import { ApiFile } from 'src/core/decorators/api-file.decorator';

import { imageFilter } from 'src/core/utils/image-filter.util';
import { fileStorage } from 'src/core/utils/upload-storage.util';

export const UploadAvatarDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'upload avatar',
      description: `upload a photo for user avatar`,
    }),
    ApiConsumes('multipart/form-data'),
    ApiFile('avatar'),
    UseGuards(AuthGuard),
    UseGuards(CheckPermission([])),
    Post('upload-avatar'),
    UseInterceptors(
      FileInterceptor('avatar', {
        storage: fileStorage('avatars'),
        fileFilter: imageFilter,
      }),
    ),
  );
};
