import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { ResponseMessages } from '../constants/response-messages.constant';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const [bearer, token] = req.headers.authorization?.split(' ');
    const validBearer = ['Bearer', 'bearer'];

    if (!token || !validBearer.includes(bearer)) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
    try {
      console.log({ bearer, token, JWT_SECRET: process.env.JWT_SECRET });
      const payload: any = jwt.verify(token, process.env.JWT_SECRET);

      const user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
      }

      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
  }
}
