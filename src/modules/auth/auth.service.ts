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
import { configService } from 'src/core/config/app.config';

import { CheckOtpDto } from './dtos/check-otp.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { emailPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly cacheService: Redis,
    private readonly userRepository: UserRepository,
    private smsService: SmsService,
    private mailService: MailService,
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
      if (!isEmail) {
        await this.smsService.sendOtpSms(mobileOrEmail, code);
      }

      // send otp code to user email
      if (isEmail) {
        console.log({ code });
        await this.mailService.sendOtpMail(mobileOrEmail, code);
      }

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
      const accessToken = await this.signToken(
        user._id as any,
        configService.get('ACCESS_TOKEN_SECRET_KEY'),
        configService.get('ACCESS_TOKEN_EXPIRES'),
      );

      // generate refresh token
      const refreshToken = await this.signToken(
        user._id as any,
        configService.get('REFRESH_TOKEN_SECRET_KEY'),
        configService.get('REFRESH_TOKEN_EXPIRES'),
      );

      // save accessToken and refreshToken to mongodb
      await this.userRepository.updateById(user._id, {
        accessToken,
        refreshToken,
      });

      return {
        statusCode: HttpStatus.CREATED,
        data: { accessToken, refreshToken },
      };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  async refreshToken(refreshToken: string): Promise<ResponseFormat<any>> {
    try {
      const userId = await this.verifyRefreshToken(refreshToken);
      const user = await this.userRepository.findById(userId);

      // generate access token
      const accessToken = await this.signToken(
        user._id as any,
        configService.get('ACCESS_TOKEN_SECRET_KEY'),
        configService.get('ACCESS_TOKEN_EXPIRES'),
      );

      // generate refresh token
      const newRefreshToken = await this.signToken(
        user._id as any,
        configService.get('REFRESH_TOKEN_SECRET_KEY'),
        configService.get('REFRESH_TOKEN_EXPIRES'),
      );

      // save accessToken and refreshToken to mongodb
      await this.userRepository.updateById(user._id, {
        accessToken,
        refreshToken: newRefreshToken,
      });

      return {
        statusCode: HttpStatus.CREATED,
        data: { accessToken, refreshToken },
      };
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
  private async signToken(
    userId: string,
    secretKey: string,
    expiresIn: string,
  ) {
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
  private verifyRefreshToken(token: string): Promise<string> {
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
}
