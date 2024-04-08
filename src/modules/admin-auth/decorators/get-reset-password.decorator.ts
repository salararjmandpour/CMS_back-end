import { Get, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { forgotPasswordValidator } from '../validators/forgot-password.validator';

export const GetResetPasswordDecorator = () => {
  return applyDecorators(Get('reset-password'));
};
