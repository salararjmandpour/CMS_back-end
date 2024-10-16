import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiGetUsersList } from '../docs/get-users-list.doc';

export const getUsersListDecorator = () => {
  return applyDecorators(
    Get(),
    ApiTags('Users'),
    UseGuards(AuthGuard),
    ApiQuery({
      name: 'role',
      required: false,
      description:
        "required values: 'CUSTOMER', 'SALES', 'STOREADMIN', 'SUPERADMIN', 'ALL'",
    }),
    ApiGetUsersList(),
    ApiQuery({ name: 'role', required: false }),
    ApiQuery({ name: 'search', required: false }),
  );
};
