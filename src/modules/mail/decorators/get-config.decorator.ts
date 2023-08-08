import { Get, applyDecorators } from '@nestjs/common';

export const GetConfigDecorator = () => {
  return applyDecorators(Get('get-config'));
};
