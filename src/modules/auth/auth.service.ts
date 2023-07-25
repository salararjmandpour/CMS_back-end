import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { CheckOtpDto } from './dtos/check-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getOtp(mobile: string): Promise<ResponseFormat<any>> {
    const code = this.generateRandomNumber();

    const result = await this.saveUser(mobile, code);
    if (!result) throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);

    return { statusCode: HttpStatus.CREATED, data: { code } };
  }

  async checkOtp({ mobile, code }: CheckOtpDto): Promise<ResponseFormat<any>> {
    const user = await this.userModel.findOne({ mobile });
    if (!user) throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);

    const now = Date.now();

    if (user.otp.code !== code)
      throw new UnauthorizedException(
        ResponseMessages.CODE_SENT_IS_NOT_CORRECT,
      );

    if (+user.otp.expiresIn < now)
      throw new UnauthorizedException(ResponseMessages.YOUR_CODE_EXPIRED);

    return { statusCode: HttpStatus.CREATED, data: { token: '' } };
  }

  private async saveUser(mobile: string, code: string) {
    const otp = {
      code,
      expiresIn: new Date().getTime() + 120000,
    };
    const existUserResult = await this.checkExistUser(mobile);
    if (existUserResult) return await this.updateUser(mobile, otp);

    return !!(await this.userModel.create({
      mobile,
      otp,
    }));
  }

  private async updateUser(
    mobile: string,
    otp: { code: string; expiresIn: number },
  ) {
    const updateResult = await this.userModel.updateOne(
      { mobile },
      { $set: otp },
    );
    return !!updateResult.modifiedCount;
  }

  private async checkExistUser(mobile: string) {
    const user = await this.userModel.findOne({ mobile });
    return !!user;
  }

  private generateRandomNumber(): string {
    const minm = 100000,
      maxm = 999999;
    const code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return String(code);
  }
}
