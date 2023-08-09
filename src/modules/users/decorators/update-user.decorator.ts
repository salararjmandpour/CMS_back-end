import { Patch, applyDecorators } from '@nestjs/common';

export const updateUserDecorator = () => {
  return applyDecorators(Patch(':id'));
};
