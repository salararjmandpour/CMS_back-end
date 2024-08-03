import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoModule } from '../seo/seo.module';
import { GalleryModule } from '../gallery/gallery.module';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { LabelsRepository } from './labels.repository';
import { Label, LabelSchema } from './schemas/label.schema';
import { ProductsModule } from '../products/products.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Label.name, schema: LabelSchema },
    ]),
    SeoModule,
    ProductsModule,
    PostsModule,
    GalleryModule,
  ],
  providers: [LabelsService, LabelsRepository],
  controllers: [LabelsController],
  exports: [LabelsRepository],
})
export class LabelsModule {}
