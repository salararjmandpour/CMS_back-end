import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { SeoModule } from '../seo/seo.module';

@Module({
  imports: [
    SeoModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsRepository],
})
export class ProductsModule {}
