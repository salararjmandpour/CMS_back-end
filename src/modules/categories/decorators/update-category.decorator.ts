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
import { ApiUpdateCategory } from '../docs/update-category.doc';
import { fileStorage } from 'src/core/utils/upload-storage.util';

export const UpdateCategoryDecorator = () => {
  return applyDecorators(
    Patch(':id'),
    ApiUpdateCategory(),
    UseGuards(AuthGuard),
    ApiConsumes('multipart/form-data'),
    UseInterceptors(
      FileInterceptor('image', {
        limits: {
          fileSize: 1024 * 1024 * 2, // 2MB
        },
        storage: fileStorage('category', 'date'),
        fileFilter: fileFilter,
      }),
    ),
  );
};
