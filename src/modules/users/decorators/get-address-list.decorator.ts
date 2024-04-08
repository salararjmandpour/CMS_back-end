import { Get, UseGuards, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiGetAddressList } from '../docs/get-address-list.doc';
import { ApiTags } from '@nestjs/swagger';

export const GteAddressListDecorator = () => {
  return applyDecorators(
    Get('address'),
    ApiTags('Profile'),
    UseGuards(AuthGuard),
    ApiGetAddressList(),
  );
};
