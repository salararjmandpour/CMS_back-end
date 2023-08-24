import { ApiConsumes } from '@nestjs/swagger';
import { Delete, UseGuards, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteInGallery } from '../docs/delete-in-gallery.doc';

export const DeleteInGalleryDecorator = () => {
  return applyDecorators(
    Delete(':id'),
    UseGuards(AuthGuard),
    ApiDeleteInGallery(),
  );
};
