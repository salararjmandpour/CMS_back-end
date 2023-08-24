import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiGetGallery } from '../docs/get-gallery.doc';

export const GetGalleryDecorator = () => {
  return applyDecorators(Get(), UseGuards(AuthGuard), ApiGetGallery());
};
