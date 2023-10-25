import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { CraetePostInput, UpdatePostInput } from './interfaces/post.interface';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  create(data: CraetePostInput) {
    return this.postModel.create({ ...data, view: 0 });
  }

  findOneById(id: string) {
    return this.postModel.findById(id);
  }

  updateOne(_id: string, data: UpdatePostInput) {
    return this.postModel.updateOne({ _id }, { $set: data });
  }

  findAll(
    filter?: FilterQuery<Post>,
    projection?: ProjectionType<Post>,
    options?: QueryOptions<Post>,
  ) {
    return this.postModel.find(filter, projection, options);
  }
}
