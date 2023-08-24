import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { GalleryRepository } from './gallery.repository';
import { Gallery, GallerySchema } from './schemas/gallery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
  ],
  providers: [GalleryService, GalleryRepository],
  controllers: [GalleryController],
})
export class GalleryModule {}
