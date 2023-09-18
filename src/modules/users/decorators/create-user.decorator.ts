import { ApiTags } from '@nestjs/swagger';
import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCreateUser } from '../docs/create-user.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createUserValidator } from '../validator/create-user.validator';

export const CreateUserDecorator = () => {
  return applyDecorators(
    Post(),
    ApiTags('Users'),
    ApiCreateUser(),
    UseGuards(AuthGuard),
    UsePipes(new JoiValidatorPipe(createUserValidator)),
  );
};
