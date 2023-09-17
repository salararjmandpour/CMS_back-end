import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth.guard';

export const UpdateUserDecorator = () => {
  return applyDecorators(Patch(':id'), UseGuards(AuthGuard), ApiTags('Users'));
};
