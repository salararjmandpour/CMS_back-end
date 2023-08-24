import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Param, UploadedFile } from '@nestjs/common';

import { GalleryService } from './gallery.service';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { AddToGalleryDecorator } from './decorators/add-to-gallery.decorator';
import { DeleteInGalleryDecorator } from './decorators/delete-in-gallery.decorator';
import { UpdateInGalleryDecorator } from './decorators/update-in-gallery.decorator';

@ApiBearerAuth()
@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  // add file to gallery
  @AddToGalleryDecorator()
  addToGallery(@UploadedFile() file: Express.Multer.File) {
    return this.galleryService.addToGaller(file);
  }

  // update file in gallery
  @UpdateInGalleryDecorator()
  updateInGallery(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.galleryService.updateInGallery(id, file);
  }

  // delete file in gallery
  @DeleteInGalleryDecorator()
  deleteInGallery(@Param('id', ParseObjectIdPipe) id: string) {
    return this.galleryService.deleteFileInGallery(id);
  }
}
