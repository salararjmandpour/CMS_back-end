import { Patch, applyDecorators } from '@nestjs/common';
import { UpdateProductDoc } from '../docs/update-product.doc';

export const UpdateProductDecorator = () => {
  return applyDecorators(UpdateProductDoc(), Patch(':id'));
};
