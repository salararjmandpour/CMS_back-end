import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SEO } from './schemas/seo.schema';
import { CreateSeoDto } from './dto/create-seo.dto';

@Injectable()
export class SeoRepository {
  constructor(@InjectModel(SEO.name) private seoModel: Model<SEO>) {}

  create(date: CreateSeoDto) {
    return this.seoModel.create(date);
  }

  findBySlug(slug: string) {
    return this.seoModel.findOne({ slug });
  }
}
