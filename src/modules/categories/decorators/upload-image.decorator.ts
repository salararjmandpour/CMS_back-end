import {
  Patch,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiUploadImage } from '../docs/upload-image.doc';
import { imageFilter } from 'src/core/utils/file-filter.util';
import { fileStorage } from 'src/core/utils/upload-storage.util';
import { ApiFile } from 'src/core/decorators/api-file.decorator';

export const UploadImageDecorator = () => {
  return applyDecorators(
    Patch('upload-image'),
    ApiUploadImage(),
    ApiConsumes('multipart/form-data'),
    ApiFile('avatar'),
    UseGuards(AuthGuard),
    UseInterceptors(
      FileInterceptor('avatar', {
        storage: fileStorage('avatars'),
        fileFilter: imageFilter,
      }),
    ),
  );
};
