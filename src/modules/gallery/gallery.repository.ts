import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gallery } from './schemas/gallery.schema';

@Injectable()
export class GalleryRepository {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<Gallery>,
  ) {}

  create(src: string, type: string) {
    return this.galleryModel.create({ src, type });
  }
}
