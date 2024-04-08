import {
  Body,
  Query,
  Param,
  Controller,
  UploadedFiles,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GalleryService } from './gallery.service';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';

import { GetGalleryQueryDto } from './dtos/get-gallery-query.dto';
import { UpdateFromGalleryDto } from './dtos/update-from-gallery.dto';
import { DeleteManyInGalleryDto } from './dtos/delete-many-in-gallery.dto';

import { GetUser } from 'src/core/decorators/get-user-param.decorator';
import { GetGalleryDecorator } from './decorators/get-gallery.decorator';
import { AddToGalleryDecorator } from './decorators/add-to-gallery.decorator';
import { UpdateFromGalleryDecorator } from './decorators/update-in-gallery.decorator';
import { DeleteOneInGalleryDecorator } from './decorators/delete-one-in-gallery.decorator';
import { DeleteManyInGalleryDecorator } from './decorators/delete-many-in-gallery.decorator';
import { joiValidation } from 'src/core/utils/joi-validator.util';
import { updateFromGalleryValidator } from './validators/update-from-gallery';

@ApiBearerAuth()
@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  // add file to gallery
  @AddToGalleryDecorator()
  addToGallery(
    @GetUser('_id') _id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.galleryService.addToGaller(_id, files);
  }

  // update file in gallery
  @UpdateFromGalleryDecorator()
  updateInGallery(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateFromGalleryDto,
  ) {
    // joiValidation(updateFromGalleryValidator, body);
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
    const { search, type, startDate, endDate } = query;
    return this.galleryService.getGallery(search, type, startDate, endDate);
  }
}
