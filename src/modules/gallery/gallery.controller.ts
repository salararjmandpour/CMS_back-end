import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UploadedFile } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { AddToGalleryDecorator } from './decorators/add-to-gallery.decorator';

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
}
