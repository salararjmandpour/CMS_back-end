import {
  Post,
  UseGuards,
  applyDecorators,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiAddToGallery } from '../docs/add-to-gallery.doc';
import { fileFilter } from 'src/core/utils/file-filter.util';
import { fileStorage } from 'src/core/utils/upload-storage.util';
import { ApiFiles } from 'src/core/decorators/api-file.decorator';

export const AddToGalleryDecorator = () => {
  return applyDecorators(
    Post(),
    UseGuards(AuthGuard),
    ApiConsumes('multipart/form-data'),
    ApiAddToGallery(),
    ApiFiles('files'),
    UseInterceptors(
      FilesInterceptor('files', 10, {
        storage: fileStorage('gallery', 'date'),
        fileFilter,
      }),
    ),
  );
};
