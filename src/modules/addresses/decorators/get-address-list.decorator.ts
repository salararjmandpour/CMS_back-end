import { Get, UseGuards, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiGetAddressList } from '../docs/get-address-list.doc';

export const GteAddressListDecorator = () => {
  return applyDecorators(Get(), UseGuards(AuthGuard), ApiGetAddressList());
};
