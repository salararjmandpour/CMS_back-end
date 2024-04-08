import { ApiTags } from '@nestjs/swagger';
import { Patch, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiChangeUsersRole } from '../docs/change-users-role.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { changeUsersRoleValidator } from '../validator/change-users-role.validator';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const ChangeUsersRoleDecorator = () => {
  return applyDecorators(
    Patch('change-users-role'),
    ApiTags('Users'),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    ApiChangeUsersRole(),
    UsePipes(new JoiValidatorPipe(changeUsersRoleValidator)),
  );
};
