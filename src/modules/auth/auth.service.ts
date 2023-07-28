import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

import { SmsService } from '../sms/sms.service';
import { UserRepository } from '../users/users.repository';

import { CheckOtpDto } from './dtos/check-otp.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly cacheService: Redis,
    private readonly userRepository: UserRepository,
    private smsService: SmsService,
  ) {}

  async getOtp(mobile: string): Promise<ResponseFormat<any>> {
    try {
      const code = this.generateRandomNumber();

      const result = await this.saveUser(mobile, code);
      if (!result) {
        throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
      }

      // send otp sms to user mobile
      await this.smsService.sendOtpSms(mobile, code);

      return { statusCode: HttpStatus.CREATED, data: { code } };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  async checkOtp({ mobile, code }: CheckOtpDto): Promise<ResponseFormat<any>> {
    try {
      // check exist user by mobile
      const user = await this.userRepository.findByMobile(mobile);
      if (!user) throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);

      const now = Date.now();

      // check correctness code sent
      if (user.otp.code !== code)
        throw new UnauthorizedException(
          ResponseMessages.CODE_SENT_IS_NOT_CORRECT,
        );

      // check expired code sent
      if (user.otp.expiresIn < now)
        throw new UnauthorizedException(ResponseMessages.YOUR_CODE_EXPIRED);

      // generate access token
      const accessToken = await this.signAccessToken(user._id as any);

      // save access token to mongodb
      await this.userRepository.updateById(user._id, { accessToken });

      return { statusCode: HttpStatus.CREATED, data: { accessToken } };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  // check exist user and update user or create user
  private async saveUser(mobile: string, code: string) {
    const otp = {
      code,
      expiresIn: new Date().getTime() + 120000,
    };
    const existUserResult = await this.checkExistUser(mobile);
    if (existUserResult) return await this.updateUser(mobile, otp);

    return !!(await this.userRepository.create(mobile, otp));
  }

  // update user otp by mobile
  private async updateUser(
    mobile: string,
    otp: { code: string; expiresIn: number },
  ) {
    const updateResult = await this.userRepository.updateByMobile(mobile, {otp});
    return !!updateResult.modifiedCount;
  }

  // check exist user by mobile
  private async checkExistUser(mobile: string) {
    const user = await this.userRepository.findByMobile(mobile);
    return !!user;
  }

  // generate random number 6-digit
  private generateRandomNumber(): string {
    const minm = 100000, maxm = 999999;
    const code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return String(code);
  }

  // generate access token
  private async signAccessToken(userId: string) {
    return new Promise(async (resolve, reject) => {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(ResponseMessages.USER_NOT_FOUND)
      }

      const payload = { mobile: user.mobile};
      const options = { expiresIn: process.env.JWT_EXPIRES };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        options,
        async (err: any, token: any) => {
          if (err) {
            reject(new InternalServerErrorException(ResponseMessages.INTERNAL_SERVER_ERROR));
          }
          await this.cacheService.set(userId, token);
          resolve(token);
        },
      );
    });
  }
}
