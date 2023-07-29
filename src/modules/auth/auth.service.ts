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
import { boolean } from 'joi';
import { emailPattern } from 'src/core/constants/pattern.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly cacheService: Redis,
    private readonly userRepository: UserRepository,
    private smsService: SmsService,
  ) {}

  async getOtp(mobileOrEmail: string): Promise<ResponseFormat<any>> {
    try {
      const isEmail = emailPattern.test(mobileOrEmail);
      const code = this.generateRandomNumber();

      const result = await this.saveUser(mobileOrEmail, code, isEmail);
      if (!result) {
        throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
      }

      // send otp code to user mobile
      !isEmail && (await this.smsService.sendOtpSms(mobileOrEmail, code));

      // send otp code to user email
      isEmail && console.log({ code });

      return {
        statusCode: HttpStatus.CREATED,
        message: isEmail
          ? ResponseMessages.CODE_SENT_FOR_YOUR_EMAIL
          : ResponseMessages.CODE_SENT_FOR_YOUR_MOBILE,
      };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  async checkOtp({ field, code }: CheckOtpDto): Promise<ResponseFormat<any>> {
    try {
      // check exist user by mobile or email
      const user = await this.userRepository.findByEmailOrMobile(field);
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
  private async saveUser(
    mobileOrEmail: string,
    code: string,
    isEmail: boolean,
  ) {
    const otp = {
      code,
      expiresIn: new Date().getTime() + 120000,
    };
    const existUserResult = await this.checkExistUser(mobileOrEmail);
    if (existUserResult)
      return await this.updateUser(mobileOrEmail, otp, isEmail);

    return !!(await this.userRepository.createByEmailOrMobile(
      mobileOrEmail,
      otp,
      isEmail,
    ));
  }

  // update user otp by mobile or email
  private async updateUser(
    mobileOrEmail: string,
    otp: { code: string; expiresIn: number },
    isEmail: boolean,
  ) {
    const updateResult = await this.userRepository.updateByMobileOrEmail(
      mobileOrEmail,
      { otp },
      isEmail,
    );
    return !!updateResult.modifiedCount;
  }

  // check exist user by mobile or password
  private async checkExistUser(mobile: string) {
    const user = await this.userRepository.findByEmailOrMobile(mobile);
    return !!user;
  }

  // generate random number 6-digit
  private generateRandomNumber(): string {
    const minm = 100000,
      maxm = 999999;
    const code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return String(code);
  }

  // generate access token
  private async signAccessToken(userId: string) {
    return new Promise(async (resolve, reject) => {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
      }

      const payload = { userId: user._id };
      const options = { expiresIn: process.env.JWT_EXPIRES };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        options,
        async (err: any, token: any) => {
          if (err) {
            reject(
              new InternalServerErrorException(
                ResponseMessages.INTERNAL_SERVER_ERROR,
              ),
            );
          }
          await this.cacheService.set(userId, token);
          resolve(token);
        },
      );
    });
  }
}
