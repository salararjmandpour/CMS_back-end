import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { postResetPasswordValidator } from '../validators/forgot-password.validator';

export const PostResetPasswordDecorator = () => {
  return applyDecorators(
    Post('reset-password'),
    UsePipes(new JoiValidatorPipe(postResetPasswordValidator)),
  );
};
