import {
  HttpStatus,
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import * as crypto from 'crypto-js';

import { JwtService } from '../jwt/jwt.service';
import { configService } from 'src/core/config/app.config';
import { UserRepository } from '../users/users.repository';
import {
  RolesEnum,
  UserDocument,
  AuthProviderEnum,
} from '../users/schema/user.schema';

import { LoginAdminDto } from './dtos/login-admin.dto';
import { SignupAdminDto } from './dtos/signup-admin.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import {
  nanoid,
  alphabetNumber,
  alphabetLetters,
  alphabetLowerCaseLetters,
} from 'src/core/utils/nanoid.util';
import { MainEmailService } from '../main-email/main-email.service';
import { CustomException } from 'src/core/utils/custom-exception.util';
import { PostResetPasswordDto } from './dtos/forgot-password.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly mainEmailService: MainEmailService,
  ) {}

  async login(data: LoginAdminDto): Promise<ResponseFormat<any>> {
    const user: UserDocument | null =
      await this.userRepository.findByEmailOrUsername(data.field);
    // check exist user and user role
    if (!user || user.role !== 'SUPERADMIN') {
      throw new ForbiddenException(ResponseMessages.ACCESS_DENIED);
    }

    // check match password
    const comparedPassword = user.comparePassword(data.password);
    if (!comparedPassword) {
      throw new UnauthorizedException(
        ResponseMessages.INVALID_EMAIL_OR_USERNAME,
      );
    }

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

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        accessToken,
        refreshToken,
      },
    };
  }

  async signup(data: SignupAdminDto): Promise<ResponseFormat<any>> {
    let userId: any = null;
    try {
      // prevent duplicate email
      const [duplicatedEmail, duplicatedMobile] = await Promise.all([
        this.userRepository.findByEmail(data.email),
        this.userRepository.findByMobile(data.mobile),
      ]);
      if (duplicatedEmail) {
        throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXIST);
      }
      if (duplicatedMobile) {
        throw new ConflictException(ResponseMessages.MOBILE_ALREADY_EXIST);
      }

      const password = nanoid(alphabetLetters + alphabetNumber, 10);

      // create user
      const createdResult = await this.userRepository.create({
        ...data,
        password,
        role: RolesEnum.SUPERADMIN,
        authProvider: AuthProviderEnum.LOCAL,
      });
      if (!createdResult) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_EMAILED_PASSWORD_FOR_YOU,
        );
      }
      userId = createdResult._id;

      // send password to user email
      await this.mainEmailService.sendًPasswordToAdmin(
        createdResult.email,
        password,
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: ResponseMessages.PASSWORD_EMAILED_FOR_YOU,
      };
    } catch (error) {
      if (userId) {
        await this.userRepository.deleteOneById(userId);
      }
      throw new CustomException(error.message, error.status);
    }
  }

  async forgotPassword(email: string): Promise<ResponseFormat<any>> {
    // generate a unique password reset token
    const token = nanoid(alphabetLowerCaseLetters + alphabetNumber, 60);

    // generate iv for encrypt forgot password token
    const randomBytes = crypto.lib.WordArray.random(20);
    const iv = crypto.enc.Hex.stringify(randomBytes);

    // encrypted forgot password token
    const encryptedToken: string = crypto.AES.encrypt(
      token,
      configService.get('ENCRYPTION_SECRET_KEY'),
      { iv: crypto.enc.Utf8.parse(iv) },
    ).toString();

    // check exist user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
    }

    // token expires in 1 hour
    const resetPasswordExpires = Date.now() + 3600000;

    const updatedResult = await this.userRepository.updateById(user._id, {
      resetPasswordToken: encryptedToken,
      resetPasswordExpires,
    });
    if (updatedResult.modifiedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_RESET_PASSWORD,
      );
    }

    const link = `${configService.get('HOST')}/v1/admin-auth/fogor-`;

    await this.mainEmailService.sendًForgotPassword(email, link);

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.PASSWORD_RESET_EMAIL_SENT,
    };
  }

  // render reset password form
  async getResetPassword(res: Response, token: string) {
    res.render('auth/new-password', { token });
  }

  // render reset password form
  async postResetPassword(body: PostResetPasswordDto) {
    // decrypt the token
    const decryptedBytes = crypto.AES.decrypt(
      body.token,
      configService.get('ENCRYPTION_SECRET_KEY'),
      { iv: crypto.enc.Hex.parse('5s12fdsdf') },
    );
    const decryptedToken = decryptedBytes.toString(crypto.enc.Utf8);

    const user = await this.userRepository.findOne({
      resetPasswordToken: decryptedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new ForbiddenException(ResponseMessages.INVALID_OR_EXPIRED_TOKEN);
    }

    await this.userRepository.updateById(user._id, {
      password: body.password,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.PASSWORD_RESET_SUCCESSFULLY,
    };
  }
}
