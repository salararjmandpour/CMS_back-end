import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { CraetePostInput } from './interfaces/post.interface';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  create(data: CraetePostInput) {
    return this.postModel.create({ ...data, view: 0 });
  }

  findOneById(id: string) {
    return this.postModel.findById(id);
  }
}
