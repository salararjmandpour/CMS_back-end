import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schema/user.schema';
import { UserNumberType } from 'src/core/interfaces/user.interface';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  findById(id: string) {
    return this.userModel.findById(id);
  }

  findByEmail(email: string, fileds?: UserNumberType) {
    return this.userModel.findOne({ email }, fileds);
  }

  findByMobile(mobile: string) {
    return this.userModel.findOne({ mobile });
  }

  create(mobile: string, otp: { code: string; expiresIn: number }) {
    return this.userModel.create({ mobile, otp });
  }

  updateById(id: string | Types.ObjectId, fileds: any) {
    return this.userModel.updateOne({ _id: id }, { $set: fileds });
  }

  updateByMobile(mobile: string, fileds: any) {
    return this.userModel.updateOne({ mobile }, { $set: fileds });
  }
}
