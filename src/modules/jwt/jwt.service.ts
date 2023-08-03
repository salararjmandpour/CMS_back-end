import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

import { RedisService } from '../redis/redis.service';
import { configService } from 'src/core/config/app.config';
import { UserRepository } from '../api-modules/users/users.repository';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class JwtService {
  constructor(
    @InjectRedis() private readonly cacheService: RedisService,
    private readonly userRepository: UserRepository,
  ) {}

  // generate access token
  async signToken(
    userId: string,
    secretKey: string,
    expiresIn: string,
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
      }

      const payload = { userId: user._id };
      const options = { expiresIn };

      jwt.sign(payload, secretKey, options, async (err: any, token: any) => {
        if (err) {
          reject(
            new InternalServerErrorException(
              ResponseMessages.INTERNAL_SERVER_ERROR,
            ),
          );
        }
        await this.cacheService.set(userId, token);
        resolve(token);
      });
    });
  }

  // verify refresh token
  verifyRefreshToken(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        configService.get('REFRESH_TOKEN_SECRET_KEY'),
        async (err, payload: any) => {
          if (err) {
            return reject(
              new UnauthorizedException(ResponseMessages.UNAUTHORIZED),
            );
          }

          const user = await this.userRepository.findById(payload.userId, {
            otp: 0,
            password: 0,
            accessToken: 0,
            refreshToken: 0,
          });
          if (!user) {
            return reject(
              new UnauthorizedException(ResponseMessages.UNAUTHORIZED),
            );
          }

          resolve(payload.userId);
        },
      );
    });
  }

  //  verify access token
  verifyAccessToken(token: string) {
    return jwt.verify(token, configService.get('ACCESS_TOKEN_SECRET_KEY'));
  }
}
