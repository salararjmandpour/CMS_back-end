import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

import { Gallery } from './schemas/gallery.schema';
import { AddToGalleryDto } from './dtos/add-to-gallery.dto';
import { UpdateFromGalleryDto } from './dtos/update-from-gallery.dto';
import { DeleteManyInGalleryDto } from './dtos/delete-many-in-gallery.dto';

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
