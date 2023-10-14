import { Delete, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiOneDeleteInGallery } from '../docs/delete-one-in-gallery.doc';

export const DeleteOneInGalleryDecorator = () => {
  return applyDecorators(
    Delete(':id'),
    UseGuards(AuthGuard),
    ApiOneDeleteInGallery(),
  );
};
