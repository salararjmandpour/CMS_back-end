import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '../../jwt/jwt.service';
import { configService } from 'src/core/config/app.config';
import { UserRepository } from '../users/users.repository';
import { UserDocument } from '../users/schema/user.schema';

import { LoginAdminDto } from './dtos/login-admin.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(data: LoginAdminDto): Promise<ResponseFormat<any>> {
    const user: UserDocument | null =
      await this.userRepository.findByEmailOrUsername(data.field);

    // check exist user and user role
    if (!user || user.role !== 'SUPERADMIN') {
      throw new UnauthorizedException(
        ResponseMessages.INVALID_EMAIL_OR_USERNAME,
      );
    }

    // check match password
    const comparedPassword = await user.comparePassword(data.password);
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
}
