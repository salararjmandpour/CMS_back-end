import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeoModule } from '../seo/seo.module';
import { GalleryModule } from '../gallery/gallery.module';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { Category, CategorySchema } from './schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    SeoModule,
    GalleryModule,
  ],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
