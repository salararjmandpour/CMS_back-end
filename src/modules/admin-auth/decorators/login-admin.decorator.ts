import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { loginAdminValidator } from '../validators/login-admin.validator';

export const LoginAdminDecorator = () => {
  return applyDecorators(
    UsePipes(new JoiValidationPipe(loginAdminValidator)),
    Post('login'),
  );
};
