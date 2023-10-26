import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoRepository } from './seo.repository';
import { SEO, SeoSchema } from './schemas/seo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SEO.name, schema: SeoSchema }])],
  providers: [SeoRepository],
  exports: [SeoRepository],
})
export class SeoModule {}
