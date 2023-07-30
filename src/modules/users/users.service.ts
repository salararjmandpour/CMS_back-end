import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepository } from './users.repository';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@ApiBearerAuth()
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  // get logged in user
  async getMe(req: Request): Promise<ResponseFormat<any>> {
    try {
      if (!req.user) {
        throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
      }

      const user = await this.userRepository.findByEmail(req.user.email, {
        otp: 0,
        password: 0,
        accessToken: 0,
        refreshToken: 0,
      });

      return { statusCode: HttpStatus.OK, data: { user } };
    } catch (error) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
  }
}
