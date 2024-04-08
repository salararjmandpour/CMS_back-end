import { ApiTags } from '@nestjs/swagger';
import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCreateUser } from '../docs/create-user.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createUserValidator } from '../validator/create-user.validator';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const CreateUserDecorator = () => {
  return applyDecorators(
    Post(),
    ApiTags('Users'),
    ApiCreateUser(),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    UsePipes(new JoiValidatorPipe(createUserValidator)),
  );
};
