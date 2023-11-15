import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

import { Gallery } from './schemas/gallery.schema';
import { UpdateFromGalleryDto } from './dtos/update-from-gallery.dto';
import { AddToGalleryInput } from './interfaces/add-to-gallery.interface';

@Injectable()
export class GalleryRepository {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<Gallery>,
  ) {}

  create(data: AddToGalleryInput) {
    return this.galleryModel.create(data);
  }

  update(
    _id: string,
    update: UpdateFromGalleryDto,
    options?: QueryOptions<Gallery>,
  ) {
    return this.galleryModel.findOneAndUpdate({ _id }, update, options);
  }

  findById(id: string) {
    return this.galleryModel.findById(id);
  }

  findAll(filter?: FilterQuery<Gallery>, projection?: ProjectionType<Gallery>) {
    return this.galleryModel.find(filter, projection);
  }

  deleteOneById(_id: string, options?: QueryOptions<Gallery>): Promise<any> {
    return this.galleryModel.deleteOne({ _id }, options);
  }

  deleteManyByIds(
    files: string[],
    options?: QueryOptions<Gallery>,
  ): Promise<any> {
    return this.galleryModel.deleteMany({ _id: { $in: files } }, options);
  }
}
