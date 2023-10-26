import { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from 'src/modules/users/schema/user.schema';

export const GetUser = createParamDecorator(
  (keyname: keyof UserDocument, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const user: UserDocument = req.user;
    return keyname ? user[keyname] : user;
  },
);
