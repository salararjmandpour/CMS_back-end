import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { signupAdminValidator } from '../validators/signup-admin.validator';

export const SignupAdminDecorator = () => {
  return applyDecorators(
    UsePipes(new JoiValidatorPipe(signupAdminValidator)),
    Post('signup'),
  );
};
