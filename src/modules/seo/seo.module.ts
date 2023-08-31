import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeoService } from './seo.service';
import { SeoRepository } from './seo.repository';
import { SeoController } from './seo.controller';
import { SEO, SeoSchema } from './schemas/seo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SEO.name, schema: SeoSchema }])],
  providers: [SeoService, SeoRepository],
  controllers: [SeoController],
  exports: [SeoService],
})
export class SeoModule {}
