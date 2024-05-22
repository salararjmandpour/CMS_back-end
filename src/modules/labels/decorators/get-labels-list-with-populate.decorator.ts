import { ApiQuery } from '@nestjs/swagger';
import { Get, applyDecorators } from '@nestjs/common';

export const GetLabelListWithPopulateDecorator = () => {
  return applyDecorators(
    Get('populate'),
    ApiQuery({ name: 'search', type: String, required: false }),
  );
};
