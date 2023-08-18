import { Get, applyDecorators } from '@nestjs/common';
import { GetProductsDoc } from '../docs/get-products.doc';
import { ApiQuery } from '@nestjs/swagger';

export const GetProductsDecorator = () => {
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'search', required: false, type: String }),
    GetProductsDoc(),
    Get(),
  );
};
