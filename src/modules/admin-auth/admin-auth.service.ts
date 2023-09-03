import {
  HttpStatus,
  Injectable,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

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
} from 'src/core/utils/nanoid.util';
import { MainEmailService } from '../main-email/main-email.service';
import { CustomException } from 'src/core/utils/custom-exception.util';

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

    console.log({ user });
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
}
