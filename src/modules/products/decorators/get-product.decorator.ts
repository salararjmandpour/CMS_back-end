import { Get, applyDecorators } from '@nestjs/common';
import { ApiGetProduct } from '../docs/get-product.doc';

export const GetProductDecoratpr = () => {
  return applyDecorators(Get(':id'), ApiGetProduct());
};
