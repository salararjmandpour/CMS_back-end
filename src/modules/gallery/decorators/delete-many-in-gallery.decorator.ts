import { Delete, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteManyInGallery } from '../docs/delete-many-in-gallery.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const DeleteManyInGalleryDecorator = () => {
  return applyDecorators(
    Delete(),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    ApiDeleteManyInGallery(),
  );
};
