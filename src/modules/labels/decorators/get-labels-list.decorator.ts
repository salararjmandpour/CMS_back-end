import { ApiQuery } from '@nestjs/swagger';
import { Get, applyDecorators } from '@nestjs/common';
import { ApiGetLabelList } from '../docs/get-label-list.doc';

export const GetLabelListDecorator = () => {
  return applyDecorators(
    Get(),
    ApiGetLabelList(),
    ApiQuery({ name: 'search', type: String, required: false }),
  );
};
