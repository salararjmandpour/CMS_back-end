import { ApiTags } from '@nestjs/swagger';
import { Patch, UseGuards, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiUpdateAddress } from '../docs/update-address.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const UpdateAddressDecorator = () => {
  return applyDecorators(
    ApiTags('Profile'),
    Patch('address/:id'),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    ApiUpdateAddress(),
  );
};
