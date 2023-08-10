import { Get, applyDecorators } from '@nestjs/common';

export const GetSmsConfigDecorator = () => {
  return applyDecorators(Get('/sms/get-config'));
};
