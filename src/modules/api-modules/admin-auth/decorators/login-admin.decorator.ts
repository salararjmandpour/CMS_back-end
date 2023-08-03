import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { loginAdminValidator } from '../validators/login-admin.validator';

export const LoginAdminDecorator = () => {
  return applyDecorators(
    UsePipes(new JoiValidatorPipe(loginAdminValidator)),
    Post('login'),
  );
};
