import {
  Patch,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { fileFilter } from 'src/core/utils/file-filter.util';
import { fileStorage } from 'src/core/utils/upload-storage.util';
import { ApiFile } from 'src/core/decorators/api-file.decorator';
import { ApiUpdateInGallery } from '../docs/update-in-gallery.doc';

export const UpdateInGalleryDecorator = () => {
  return applyDecorators(
    Patch(':id'),
    UseGuards(AuthGuard),
    ApiConsumes('multipart/form-data'),
    ApiFile('file'),
    ApiUpdateInGallery(),
    UseInterceptors(
      FileInterceptor('file', {
        limits: {
          fileSize: 1024 * 1024 * 10,
        },
        storage: fileStorage('gallery'),
        fileFilter: fileFilter,
      }),
    ),
  );
};
