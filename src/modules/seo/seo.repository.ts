import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

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

  findBySlug(slug: string) {
    return this.seoModel.findOne({ slug });
  }

  async findWithCategory(): Promise<SeoDocument[]> {
    return this.seoModel.find({ category: { $ne: null } });
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

  deleteOne(filter?: FilterQuery<SeoDocument>): Promise<any> {
    return this.seoModel.deleteOne(filter);
  }

  deleteManyByIds(IDs: any): Promise<any> {
    console.log(IDs);
    return this.seoModel.deleteMany({ _id: { $in: IDs } });
  }

  countDocumentsBySlug(slug: string) {
    return this.seoModel.countDocuments({
      slug: new RegExp(`^${slug}(-\\d+)?$`),
    });
  }
}
