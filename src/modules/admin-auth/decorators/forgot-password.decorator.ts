import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { forgotPasswordValidator } from '../validators/forgot-password.validator';

export const ForgotPasswordDecorator = () => {
  return applyDecorators(
    Post('forgot-password'),
    UsePipes(new JoiValidatorPipe(forgotPasswordValidator)),
  );
};
