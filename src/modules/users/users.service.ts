import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';

import { User } from './schema/user.schema';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { ResponseFormat } from 'src/core/interfaces/response.interface';

@ApiBearerAuth()
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async getMe(req: Request): Promise<ResponseFormat<any>> {
    try {
      if (!req.user) {
        throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
      }
      const user = await this.userModel.findOne(
        { email: req.user.email },
        { otp: 0, password: 0, accessToken: 0 },
      );
      return { statusCode: HttpStatus.OK, data: { user } };
    } catch (error) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
  }
}
