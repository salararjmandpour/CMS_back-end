import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const GetProductsDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get products list',
      description: 'get products list with pagination and search',
    }),
  );
};
