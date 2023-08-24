import {
  Post,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiAddToGallery } from '../docs/add-to-gallery.doc';
import { fileFilter } from 'src/core/utils/image-filter.util';
import { fileStorage } from 'src/core/utils/upload-storage.util';
import { ApiFile } from 'src/core/decorators/api-file.decorator';

export const AddToGalleryDecorator = () => {
  return applyDecorators(
    Post(),
    UseGuards(AuthGuard),
    ApiConsumes('multipart/form-data'),
    ApiFile('file'),
    ApiAddToGallery(),
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
