import { ApiQuery } from '@nestjs/swagger';
import { Get, applyDecorators } from '@nestjs/common';
import { ApiGetCategoryList } from '../docs/get-category-list.doc';

export const GetCategoryListDecorator = () => {
  return applyDecorators(
    Get(),
    ApiGetCategoryList(),
    ApiQuery({ name: 'search', type: String, required: false }),
  );
};
