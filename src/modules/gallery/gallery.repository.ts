import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { Gallery } from './schemas/gallery.schema';
import { AddToGalleryDto } from './dtos/add-to-gallery.dto';

@Injectable()
export class GalleryRepository {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<Gallery>,
  ) {}

  create(data: AddToGalleryDto) {
    return this.galleryModel.create(data);
  }

  update(
    _id: string,
    update: { src: string; type: string },
    options?: QueryOptions<Gallery>,
  ) {
    return this.galleryModel.findOneAndUpdate({ _id }, update, options);
  }

  findById(id: string) {
    return this.galleryModel.findById(id);
  }

  findAll() {
    return this.galleryModel.find();
  }

  deleteById(_id: string, options?: QueryOptions<Gallery>) {
    return this.galleryModel.deleteOne({ _id }, options);
  }
}
