import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtService } from 'src/modules/jwt/jwt.service';
import { UserRepository } from 'src/modules/api-modules/users/users.repository';
import { ResponseMessages } from '../constants/response-messages.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UserRepository,
  ) {}

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
      const payload: any = this.jwtService.verifyAccessToken(token);

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
