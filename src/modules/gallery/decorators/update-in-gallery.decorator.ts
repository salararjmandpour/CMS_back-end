import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiUpdateInGallery } from '../docs/update-in-gallery.doc';

export const UpdateFromGalleryDecorator = () => {
  return applyDecorators(
    Patch(':id'),
    UseGuards(AuthGuard),
    ApiUpdateInGallery(),
  );
};
