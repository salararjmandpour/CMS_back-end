import { StatusEnum } from 'src/modules/posts/schema/post.schema';

export interface CraetePostInput {
  title: string;
  description: object[];
  writer: string;
  status: StatusEnum;
  image: string;
  categories: string[];
}

export interface UpdatePostInput
  extends Partial<Omit<CraetePostInput, 'writer'>> {
  idUrl?: string;
  slugUrl?: string;
}
