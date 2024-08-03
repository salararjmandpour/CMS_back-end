import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

import { SEO, SeoDocument } from './schemas/seo.schema';
import { CreateSeoDto } from './dto/create-seo.dto';
import { UpdateSeoDto } from './dto/update-seo.dto';

@Injectable()
export class SeoRepository {
  constructor(@InjectModel(SEO.name) private seoModel: Model<SEO>) {}

  create(date: CreateSeoDto) {
    return this.seoModel.create(date);
  }

  findById(id: string) {
    return this.seoModel.findById(id);
  }

  findByProduct(productId: string) {
    return this.seoModel.findOne({ product: productId });
  }

  findByCategory(categoryId: string) {
    return this.seoModel.findOne({ category: categoryId });
  }

  findBySheet(sheetId: string) {
    return this.seoModel.findOne({ sheet: sheetId });
  }

  findByPost(postId: string) {
    return this.seoModel.findOne({ post: postId });
  }

  findByLabel(labelId: string) {
    return this.seoModel.findOne({ label: labelId });
  }


  findBySlug(slug: string) {
    return this.seoModel.findOne({ slug });
  }

  async findWithCategory(): Promise<SeoDocument[]> {
    return this.seoModel.find({ category: { $ne: null } });
  }

  async findWithLabel(): Promise<SeoDocument[]> {
    return this.seoModel.find({ label: { $ne: null } });
  }

  async findAll(
    filter?: FilterQuery<SeoDocument>,
    projection?: ProjectionType<SeoDocument>,
    options?: QueryOptions<SeoDocument>,
  ) {
    return this.seoModel.find(filter, projection, options);
  }

  updateById(
    _id: any,
    data: UpdateSeoDto | {},
    options?: QueryOptions<SeoDocument>,
  ) {
    return this.seoModel.findOneAndUpdate({ _id }, { $set: data }, options);
  }

  updateByProductId(
    productId: any,
    data: UpdateSeoDto,
    options?: QueryOptions<SeoDocument>,
  ) {
    return this.seoModel.findOneAndUpdate(
      { product: productId },
      { $set: data },
      options,
    );
  }

  updateBySheetId(
    sheetId: any,
    data: UpdateSeoDto | {},
    options?: QueryOptions<SeoDocument>,
  ) {
    return this.seoModel.findOneAndUpdate(
      { sheet: sheetId },
      { $set: data },
      options,
    );
  }

  updateByPostId(
    postId: any,
    data: UpdateSeoDto | {},
    options?: QueryOptions<SeoDocument>,
  ) {
    return this.seoModel.findOneAndUpdate(
      { post: postId },
      { $set: data },
      options,
    );
  }

  deleteOne(filter?: FilterQuery<SeoDocument>): Promise<any> {
    return this.seoModel.deleteOne(filter);
  }

  deleteManyByIds(Ids: string[]): Promise<any> {
    return this.seoModel.deleteMany({ _id: { $in: Ids } });
  }
  deleteManyByLabelId(labelId: string[]): Promise<any> {
    return this.seoModel.deleteMany({ label: { $in: labelId } });
  }
}
