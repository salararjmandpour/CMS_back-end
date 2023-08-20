import { Delete, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteAddress } from '../docs/delete-address.doc';

export const DeleteAddresstDecorator = () => {
  return applyDecorators(
    Delete(':id'),
    UseGuards(AuthGuard),
    ApiDeleteAddress(),
  );
};
