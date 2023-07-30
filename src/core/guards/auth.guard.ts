import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { UserRepository } from 'src/modules/users/users.repository';
import { ResponseMessages } from '../constants/response-messages.constant';
import { configService } from '../config/app.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }

    const [bearer, token] = authorization.split(' ');
    const validBearer = ['Bearer', 'bearer'];

    if (!token || !validBearer.includes(bearer)) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }

    try {
      const payload: any = jwt.verify(
        token,
        configService.get('ACCESS_TOKEN_SECRET_KEY'),
      );

      const user = await this.usersRepository.findById(payload.userId);
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
