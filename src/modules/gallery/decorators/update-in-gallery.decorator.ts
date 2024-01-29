import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiUpdateInGallery } from '../docs/update-in-gallery.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const UpdateFromGalleryDecorator = () => {
  return applyDecorators(
    Patch(':id'),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    ApiUpdateInGallery(),
  );
};
