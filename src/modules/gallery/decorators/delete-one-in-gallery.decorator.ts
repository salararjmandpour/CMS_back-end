import { Delete, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiOneDeleteInGallery } from '../docs/delete-one-in-gallery.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const DeleteOneInGalleryDecorator = () => {
  return applyDecorators(
    Delete(':id'),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    ApiOneDeleteInGallery(),
  );
};
