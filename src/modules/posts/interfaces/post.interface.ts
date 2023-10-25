import { StatusEnum } from 'src/modules/posts/schema/post.schema';

export interface CraetePostInput {
  title: string;
  description: string;
  writer: string;
  status: StatusEnum;
  image: string;
  categories: string[];
}
