import { Get, applyDecorators } from '@nestjs/common';
import { ApiGetCategoryList } from '../docs/get-category-list.doc';

export const GetCategoryListDecorator = () => {
  return applyDecorators(Get(), ApiGetCategoryList());
};
