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
import * as bcrypt from 'bcryptjs';

import { JwtService } from '../jwt/jwt.service';
import { MainEmailService } from '../main-email/main-email.service';
import { configService } from 'src/core/config/app.config';
import { UserRepository } from '../users/users.repository';

import { RolesEnum, AuthProviderEnum } from '../users/schema/user.schema';

import {
  nanoid,
  alphabetNumber,
  alphabetLetters,
  alphabetLowerCaseLetters,
} from 'src/core/utils/nanoid.util';
import * as crypto from 'src/core/utils/crypto.util';
import { CustomException } from 'src/core/utils/custom-exception.util';

import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

import { LoginAdminDto } from './dtos/login-admin.dto';
import { SignupAdminDto } from './dtos/signup-admin.dto';
import { PostResetPasswordDto } from './dtos/forgot-password.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly mainEmailService: MainEmailService,
  ) {}

  async login(body: LoginAdminDto): Promise<ResponseFormat<any>> {
    const data: any = JSON.parse(
      crypto.decrypt(
        body.encryptedData,
        configService.get('CRYPTO_SECRET_KEY'),
      ) as any,
    );

    const user = await this.userRepository.findByEmailOrUsername(data.field);
    if (!user) {
      throw new UnauthorizedException(
        ResponseMessages.INVALID_EMAIL_OR_PASSWORD,
      );
    }

    // check exist user and user role
    if (user?.role !== 'SUPERADMIN') {
      throw new ForbiddenException(ResponseMessages.ACCESS_DENIED);
    }
    // check match password
    const comparedPassword = user.comparePassword(data.password);
    if (!user || !comparedPassword) {
      throw new UnauthorizedException(
        ResponseMessages.INVALID_EMAIL_OR_PASSWORD,
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

    // encrypt access token and refresh token
    const encryptedData = crypto.encrypt(
      JSON.stringify({ accessToken, refreshToken }),
      configService.get('CRYPTO_SECRET_KEY'),
    );

    return {
      statusCode: HttpStatus.CREATED,
      encryptedData,
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

    // encrypted forgot password token
    const encryptedToken: string = crypto.encrypt(
      token,
      configService.get('CRYPTO_SECRET_KEY'),
    );

    // check exist user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
    }

    if (user.role !== RolesEnum.SUPERADMIN) {
      throw new ForbiddenException(ResponseMessages.ACCESS_DENIED);
    }

    // token expires in 1 hour
    const resetPasswordExpires = Date.now() + 3600000;

    const updatedResult = await this.userRepository.updateById(user._id, {
      resetPasswordToken: token,
      resetPasswordExpires,
    });
    if (updatedResult.modifiedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_RESET_PASSWORD,
      );
    }

    const link = `${configService.get(
      'HOST',
    )}/v1/admin-auth/reset-password?token=${token}`;

    await this.mainEmailService.sendًForgotPassword(email, link);

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.PASSWORD_RESET_EMAIL_SENT,
    };
  }

  // render reset password form
  async getResetPassword(res: Response, token: string) {
    res.render('new-password.ejs', { token });
  }

  // render reset password form
  async postResetPassword(body: PostResetPasswordDto) {
    // decrypt the token
    const decryptedBytes = crypto.decrypt(
      body.encryptedData,
      configService.get('CRYPTO_SECRET_KEY'),
    ) as any;

    const data: any = JSON.parse(decryptedBytes);

    const user = await this.userRepository.findOne({
      resetPasswordToken: data.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new ForbiddenException(ResponseMessages.INVALID_OR_EXPIRED_TOKEN);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    const updatedPassword = await this.userRepository.updateById(user._id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    if (updatedPassword.modifiedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_RESET_PASSWORD,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.PASSWORD_RESET_SUCCESSFULLY,
    };
  }
}
