import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiGetMe } from '../docs/get-me.doc';
import { ApiTags } from '@nestjs/swagger';

export const GetMeDecorator = () => {
  return applyDecorators(
    ApiTags('Users'),
    ApiGetMe(),
    UseGuards(AuthGuard),
    Get('@me'),
  );
};
