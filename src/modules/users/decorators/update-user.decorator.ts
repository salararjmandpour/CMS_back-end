import { Patch, applyDecorators } from '@nestjs/common';

export const UpdateUserDecorator = () => {
  return applyDecorators(Patch(':id'));
};
