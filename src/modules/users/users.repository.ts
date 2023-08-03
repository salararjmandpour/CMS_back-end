import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schema/user.schema';
import { UserNumberType } from 'src/core/interfaces/user.interface';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  findById(id: string, fields?: UserNumberType) {
    return this.userModel.findOne({ _id: id }, fields);
  }

  findByEmail(email: string, fields?: UserNumberType) {
    return this.userModel.findOne({ email }, fields);
  }

  findByMobile(mobile: string) {
    return this.userModel.findOne({ mobile });
  }

  createByEmailOrMobile(
    mobileOrEmail: string,
    otp: { code: string; expiresIn: number },
    isEmail: boolean,
  ) {
    return this.userModel.create({
      [isEmail ? 'email' : 'mobile']: mobileOrEmail,
      otp,
    });
  }

  createByEmail(email: string, otp: { code: string; expiresIn: number }) {
    return this.userModel.create({ email, otp });
  }

  updateById(id: string | Types.ObjectId, fields: any) {
    return this.userModel.updateOne({ _id: id }, { $set: fields });
  }

  updateByMobile(mobile: string, fields: any) {
    return this.userModel.updateOne({ mobile }, { $set: fields });
  }

  findByEmailOrMobile(mobileOrEmail: string) {
    return this.userModel.findOne({
      $or: [{ email: mobileOrEmail }, { mobile: mobileOrEmail }],
    });
  }

  findByEmailOrUsername(emailOrUsername: string): Promise<UserDocument> {
    return this.userModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
  }

  updateByMobileOrEmail(mobileOrEmail: string, fields: any, isEmail: boolean) {
    return this.userModel.updateOne(
      { [isEmail ? 'email' : 'mobile']: mobileOrEmail },
      { $set: fields },
    );
  }
}
