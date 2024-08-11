import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, QueryOptions, ProjectionType } from 'mongoose';
import { Post } from './schema/post.schema';
import { CreatePostInput, UpdatePostInput } from './interfaces/post.interface';
import { CreatePostWithSeoDto } from './dtos/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  create(data: CreatePostInput) {
    return this.postModel.create({ ...data, view: 0 });
  }

  findOneById(id: string) {
    return this.postModel.findById(id).populate([
      { path: 'category', select: '_id title slug' },
      {
        path: 'writer',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  updateOne(_id: string, data: UpdatePostInput) {
    return this.postModel.updateOne({ _id }, { $set: data });
  }

  findAll(
    filter?: FilterQuery<Post>,
    projection?: ProjectionType<Post>,
    options?: QueryOptions<Post>,
  ) {
    return this.postModel.find(filter, projection, options).populate([
      { path: 'category', select: '_id title slug' },
      {
        path: 'writer',
        select: '_id avatar mobile email role firstName lastName username',
      },
    ]);
  }

  incrementViewCount(postId: string) {
    return this.postModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { view: 1 } },
      { new: true },
    );
  }

  deleteManyByIds(postIds: string[]): Promise<any> {
    return this.postModel.deleteMany({ _id: { $in: postIds } });
  }


  deleteManyByLabelId(labelId: string[]): Promise<any> {     
    return this.postModel.updateMany(
      { "labels.value._id": { $in: labelId } },
      { 
        $pull: { 
          labels: { 
            "value._id": { $in: labelId } 
          }
        }
      }
    ).exec();
  }

  deleteManyByCategoryId(categoryId: string[]): Promise<any> {     
    return this.postModel.updateMany(
      { "category.value._id": { $in: categoryId } },
      { 
        $pull: { 
          category: { 
            "value._id": { $in: categoryId } 
          }
        }
      }
    ).exec();
  }


  async updateByLabelId(labelId: string, labelTitle: string): Promise<any> {
    return this.postModel
      .updateMany(
        { 'labels.value._id': labelId },
        {
          $set: {
            'labels.$.value.title': labelTitle,
          },
        },
      )
      .exec();
  }


  async updateByCategoryId(categoryId: string, categoryTitle: string): Promise<any> {
    return this.postModel
      .updateMany(
        { 'category.value._id': categoryId },
        {
          $set: {
            'category.$.value.title': categoryTitle,
          },
        },
      )
      .exec();
  }

}
