import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PostsRepository } from './posts.repository';
import { SeoRepository } from '../seo/seo.repository';
import { CategoriesRepository } from '../categories/categories.repository';

import { CreatePostWithSeoDto } from './dtos/create-post.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class PostsService {
  constructor(
    private seoRepository: SeoRepository,
    private postsRepository: PostsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async create(
    userId: string,
    data: CreatePostWithSeoDto,
  ): Promise<ResponseFormat<any>> {
    // check exist categories
    const categories = await this.categoriesRepository.findManyByIds(
      data.post.categories,
    );
    if (categories.length !== data.post.categories.length) {
      throw new NotFoundException(ResponseMessages.CATEGORIES_NOT_FOUND);
    }

    // save post in database
    const createdPost = await this.postsRepository.create({
      ...data.post,
      writer: userId,
    });

    if (!createdPost) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_POST,
      );
    }

    // create seo
    await this.seoRepository.create({
      ...data.seo,
      post: createdPost._id.toString(),
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.POST_CREATED_SUCCESS,
    };
  }
}
