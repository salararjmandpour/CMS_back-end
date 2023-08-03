import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

import { SmsService } from '../sms/sms.service';
import { JwtService } from '../jwt/jwt.service';
import { MailService } from '../mail/mail.service';

import { UserRepository } from '../users/users.repository';
import { configService } from 'src/core/config/app.config';

import { CheckOtpDto } from './dtos/check-otp.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { emailPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly googleClient: OAuth2Client,
    private readonly mailService: MailService,
    private readonly smsService: SmsService,
    private readonly jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client({
      clientId: configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      clientSecret: configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      redirectUri: configService.get('GOOGLE_OAUTH_REDIRECT_URL'),
    });
  }

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
      const accessToken = await this.jwtService.signToken(
        user._id as any,
        configService.get('ACCESS_TOKEN_SECRET_KEY'),
        configService.get('ACCESS_TOKEN_EXPIRES'),
      );

      // generate refresh token
      const refreshToken = await this.jwtService.signToken(
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
      const userId = await this.jwtService.verifyRefreshToken(refreshToken);
      const user = await this.userRepository.findById(userId);

      // generate access token
      const accessToken = await this.jwtService.signToken(
        user._id as any,
        configService.get('ACCESS_TOKEN_SECRET_KEY'),
        configService.get('ACCESS_TOKEN_EXPIRES'),
      );

      // generate refresh token
      const newRefreshToken = await this.jwtService.signToken(
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

  // get google auth url (Google Auth)
  async getGoogleAuthUrl(): Promise<string> {
    const url = this.googleClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['email', 'profile'],
    });
    return url;
  }

  // get google access token  (Google Auth)
  async getGoogleAccessToken(code: string): Promise<string> {
    const { tokens } = await this.googleClient.getToken(code);
    const accessToken = tokens.access_token;
    return accessToken;
  }
}
