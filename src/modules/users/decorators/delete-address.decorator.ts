import { Delete, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteAddress } from '../docs/delete-address.doc';
import { ApiTags } from '@nestjs/swagger';

export const DeleteAddresstDecorator = () => {
  return applyDecorators(
    Delete('address/:id'),
    ApiTags('Profile'),
    UseGuards(AuthGuard),
    ApiDeleteAddress(),
  );
};
