import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Query,
  Param,
  Controller,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';

import { GalleryService } from './gallery.service';
import { AddToGalleryDto } from './dtos/add-to-gallery.dto';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';

import { UpdateFromGalleryDto } from './dtos/update-from-gallery.dto';
import { GetGalleryDecorator } from './decorators/get-gallery.decorator';
import { AddToGalleryDecorator } from './decorators/add-to-gallery.decorator';
import { DeleteInGalleryDecorator } from './decorators/delete-in-gallery.decorator';
import { UpdateInGalleryDecorator } from './decorators/update-in-gallery.decorator';
import { GetGalleryQueryDto } from './dtos/get-gallery-query.dto';

// @ApiBearerAuth()
@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  // add file to gallery
  @AddToGalleryDecorator()
  addToGallery(
    @Body() body: AddToGalleryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.galleryService.addToGaller(file, body);
  }

  // update file in gallery
  @UpdateInGalleryDecorator()
  updateInGallery(
    @Body() body: UpdateFromGalleryDto,
    @Param('id', ParseObjectIdPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.galleryService.updateInGallery(id, body, file);
  }

  // delete file in gallery
  @DeleteInGalleryDecorator()
  deleteInGallery(@Param('id', ParseObjectIdPipe) id: string) {
    return this.galleryService.deleteFileInGallery(id);
  }

  // delete file in gallery
  @GetGalleryDecorator()
  getGallery(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetGalleryQueryDto,
  ) {
    const { search, date, type } = query;
    return this.galleryService.getGallery(search, date, type);
  }
}
