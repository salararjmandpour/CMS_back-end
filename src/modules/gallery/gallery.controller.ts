import {
  Req,
  Body,
  Query,
  Param,
  Controller,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GalleryService } from './gallery.service';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';

import { AddToGalleryDto } from './dtos/add-to-gallery.dto';
import { GetGalleryQueryDto } from './dtos/get-gallery-query.dto';
import { UpdateFromGalleryDto } from './dtos/update-from-gallery.dto';
import { DeleteManyInGalleryDto } from './dtos/delete-many-in-gallery.dto';

import { GetGalleryDecorator } from './decorators/get-gallery.decorator';
import { AddToGalleryDecorator } from './decorators/add-to-gallery.decorator';
import { DeleteOneInGalleryDecorator } from './decorators/delete-one-in-gallery.decorator';
import { UpdateFromGalleryDecorator } from './decorators/update-in-gallery.decorator';
import { DeleteManyInGalleryDecorator } from './decorators/delete-many-in-gallery.decorator';

@ApiBearerAuth()
@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  // add file to gallery
  @AddToGalleryDecorator()
  addToGallery(
    @Req() req: Request,
    @Body() body: AddToGalleryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.galleryService.addToGaller(file, body, req);
  }

  // update file in gallery
  @UpdateFromGalleryDecorator()
  updateInGallery(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateFromGalleryDto,
  ) {
    return this.galleryService.updateInGallery(id, body);
  }

  // delete one file in gallery by ID
  @DeleteOneInGalleryDecorator()
  deleteOneById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.galleryService.deleteOneFile(id);
  }

  // delete many files in gallery by IDs
  @DeleteManyInGalleryDecorator()
  deleteManyByIds(@Body() body: DeleteManyInGalleryDto) {
    return this.galleryService.deleteManyFile(body);
  }

  // get gallery list
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
