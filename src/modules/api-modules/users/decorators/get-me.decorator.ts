import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiGetMe } from '../docs/get-me.doc';

export const GetMeDecorator = () => {
  return applyDecorators(ApiGetMe(), UseGuards(AuthGuard), Get('@me'));
};
