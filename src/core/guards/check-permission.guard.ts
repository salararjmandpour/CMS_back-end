import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { RolesEnum } from 'src/modules/users/schema/user.schema';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const CheckPermission = (requiredPermissions: Array<RolesEnum>) => {
  class PermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const userRole = request?.user?.role;

      if (userRole === RolesEnum.SUPERADMIN || requiredPermissions.length === 0)
        return true;

      const hasPerm: boolean = requiredPermissions.some(
        (perm) => userRole === perm,
      );

      if (hasPerm) return true;

      throw new ForbiddenException(ResponseMessages.PERMISSION_DENIED);
    }
  }

  return PermissionGuard;
};
