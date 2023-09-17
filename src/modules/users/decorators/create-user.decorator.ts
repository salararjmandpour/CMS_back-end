import { Post, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const CreateUserDecorator = () => {
  return applyDecorators(Post(), UseGuards(AuthGuard), ApiTags('Users'));
};
