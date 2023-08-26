import { Module } from '@nestjs/common';
import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SEO, SEOSchema } from './schemas/seo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SEO.name, schema: SEOSchema }])],
  providers: [SeoService],
  controllers: [SeoController],
})
export class SeoModule {}
