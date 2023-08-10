import { Get, applyDecorators } from '@nestjs/common';

export const GetEmailConfigDecorator = () => {
  return applyDecorators(Get('/email/get-config'));
};
