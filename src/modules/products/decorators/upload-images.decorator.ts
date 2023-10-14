import {
  Patch,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiUploadImages } from '../docs/upload-images.doc';
import { imageFilter } from 'src/core/utils/file-filter.util';
import { fileStorage } from 'src/core/utils/upload-storage.util';
import { ApiFiles } from 'src/core/decorators/api-file.decorator';

export const UploadImagesDecorator = () => {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiConsumes('multipart/form-data'),
    ApiFiles('images'),
    ApiUploadImages(),
    UseInterceptors(
      FilesInterceptor('images', 10, {
        storage: fileStorage('products'),
        fileFilter: imageFilter,
      }),
    ),
    Patch('upload-images/:id'),
  );
};
