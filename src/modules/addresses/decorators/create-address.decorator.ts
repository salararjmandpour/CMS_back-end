import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const CreateAddressDecorator = () => {
  return applyDecorators(Post(), UseGuards(AuthGuard));
};
