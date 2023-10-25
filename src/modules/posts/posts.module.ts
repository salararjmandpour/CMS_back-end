import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoModule } from '../seo/seo.module';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostSchema } from './schema/post.schema';
import { PostsRepository } from './posts.repository';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    CategoriesModule,
    SeoModule,
  ],
  providers: [PostsService, PostsRepository],
  controllers: [PostsController],
})
export class PostsModule {}
