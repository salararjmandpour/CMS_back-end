import {
  HttpStatus,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { PostsRepository } from './posts.repository';
import { SeoRepository } from '../seo/seo.repository';
import { CategoriesRepository } from '../categories/categories.repository';

import { CreatePostWithSeoDto } from './dtos/create-post.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { UpdatePostWithSeoDto } from './dtos/update-post.dto';
import { SeoDocument } from '../seo/schemas/seo.schema';

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

  async update(
    id: string,
    data: UpdatePostWithSeoDto,
  ): Promise<ResponseFormat<any>> {
    // if has categories, check exist it
    if (data?.post?.categories) {
      const categories = await this.categoriesRepository.findManyByIds(
        data.post.categories,
      );

      if (
        data.post?.categories &&
        categories.length !== data.post.categories.length
      ) {
        throw new NotFoundException(ResponseMessages.CATEGORIES_NOT_FOUND);
      }
    }

    // check exist post and update it
    const [post, updatedResult] = await Promise.all([
      this.postsRepository.findOneById(id),
      this.postsRepository.updateOne(id, data.post),
      this.seoRepository.updateByPostId(id, data.seo || {}),
    ]);
    if (!post) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_POST);
    }
    if (!updatedResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_POST,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.POST_UPDATED_SUCCESS,
    };
  }

  async findAll(
    status: string,
    search: string,
    startDate: Date,
    endDate: Date,
  ): Promise<ResponseFormat<any>> {
    const query: any = {};
    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: 'i' };
    if (startDate && endDate) {
      query.createdAt = { $gte: startDate, $lt: endDate };
    }

    const [posts, seos] = await Promise.all([
      this.postsRepository.findAll(query),
      this.seoRepository.findAll({ post: { $ne: null } }),
    ]);
    if (!posts || !seos) {
      throw new InternalServerErrorException(
        ResponseMessages.FAIELD_GET_POST_LIST,
      );
    }

    const postsListWithSeo = posts.map((category: any) => {
      const seo = seos.find((seo: SeoDocument) => {
        return category._id.toString() === seo.post;
      });
      return { category, seo };
    });

    return {
      statusCode: HttpStatus.OK,
      data: { posts: postsListWithSeo },
    };
  }

  async findOneById(id: string): Promise<ResponseFormat<any>> {
    const [post, seo] = await Promise.all([
      this.postsRepository.findOneById(id),
      this.seoRepository.findByPost(id),
    ]);
    if (!post) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_POST);
    }

    return {
      statusCode: HttpStatus.OK,
      data: seo ? { post, seo } : { post },
    };
  }
}
