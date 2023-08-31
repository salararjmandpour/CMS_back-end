import { ApiQuery } from '@nestjs/swagger';
import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiGetGallery } from '../docs/get-gallery.doc';

enum TypeEnum {
  'all' = 'all',
  'image' = 'image',
  'audio' = 'audio',
  'video' = 'video',
}

export const GetGalleryDecorator = () => {
  return applyDecorators(
    ApiQuery({ name: 'search', required: false, type: String }),
    ApiQuery({ name: 'date', required: false, type: String }),
    ApiQuery({ name: 'type', required: false, type: String, enum: TypeEnum }),
    Get(),
    UseGuards(AuthGuard),
    ApiGetGallery(),
  );
};
