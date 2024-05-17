import { ApiQuery } from '@nestjs/swagger';
import { Get, applyDecorators } from '@nestjs/common';

export const GetLabelListDecorator = () => {
  return applyDecorators(
    Get(),
    // ApiGetLabelList(),
    ApiQuery({ name: 'search', type: String, required: false }),
  );
};


