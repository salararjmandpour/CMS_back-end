import {
  Types,
  Model,
  FilterQuery,
  QueryOptions,
  ProjectionType,
  UpdateQuery,
} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument, UserDocumentOptional } from './schema/user.schema';

import { CreateUserDto } from './dtos/create-user.dto';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  findById(id: string, projection?: ProjectionType<User>) {
    return this.userModel.findOne({ _id: id }, projection);
  }

  findByEmail(
    email: string,
    projection?: ProjectionType<User>,
  ): Promise<UserDocument> {
    return this.userModel.findOne({ email }, projection);
  }

  findByUsername(username: string, projection?: ProjectionType<User>) {
    return this.userModel.findOne({ username }, projection);
  }

  findByMobile(mobile: string) {
    return this.userModel.findOne({ mobile });
  }

  findOne(
    filter?: FilterQuery<User>,
    projection?: ProjectionType<User>,
    options?: QueryOptions<User>,
  ) {
    return this.userModel.findOne(filter, projection, options);
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

  create(properties: UserDocumentOptional | CreateUserDto) {
    return this.userModel.create(properties);
  }

  createByEmail(email: string, otp?: { code: string; expiresIn: number }) {
    return this.userModel.create({ email, otp });
  }

  updateById(id: string | Types.ObjectId, update?: any) {
    return this.userModel.updateOne({ _id: id }, { $set: update });
  }

  updateByMobile(mobile: string, fields: any) {
    return this.userModel.updateOne({ mobile }, { $set: fields });
  }

  findByEmailOrMobile(mobileOrEmail: string) {
    return this.userModel.findOne({
      $or: [{ email: mobileOrEmail }, { mobile: mobileOrEmail }],
    });
  }

  findByEmailOrUsername(emailOrUsername: string) {
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

  deleteOneById(_id: string): Promise<any> {
    return this.userModel.deleteOne({ _id });
  }

  addOneToWishlist(
    userId: string,
    productId: string,
    options?: QueryOptions<User>,
  ) {
    return this.userModel
      .findOneAndUpdate(
        { _id: userId },
        { $push: { wishlist: productId } },
        options,
      )
      .populate('wishlist');
  }

  deleteOneFromWishlist(
    userId: string,
    productId: string,
    options?: QueryOptions<User>,
  ) {
    return this.userModel
      .findOneAndUpdate(
        { _id: userId },
        { $pull: { wishlist: productId } },
        options,
      )
      .populate('wishlist');
  }

  findOneFromWishlist(
    userId: string,
    productId: string,
    projection?: ProjectionType<User>,
  ) {
    return this.userModel
      .findOne({ _id: userId, wishlist: productId }, projection)
      .populate('wishlist');
  }

  findAllWishlist(userId: string, projection?: ProjectionType<User>) {
    return this.userModel
      .findOne({ _id: userId }, projection)
      .populate('wishlist');
  }

  findAllUsers(
    filter?: FilterQuery<UserDocument>,
    projection?: ProjectionType<UserDocument>,
  ) {
    return this.userModel.find(filter, projection);
  }

  deleteManyByIds(IDs: string[]): Promise<any> {
    return this.userModel.deleteMany({ _id: { $in: IDs } });
  }

  createAddress(userId: string, data: CreateAddressDto) {
    const addressId = new Types.ObjectId();
    return this.userModel.updateOne(
      { _id: userId },
      { $push: { addresses: { ...data, _id: addressId } } },
    );
  }

  updateAddress(userId: string, addressId: string, data: UpdateAddressDto) {
    return this.userModel.findOneAndUpdate(
      { _id: userId, 'addresses._id': addressId },
      { $set: { 'addresses.$': data } },
    );
  }

  findAddressById(userId: string, addressId: string) {
    return this.userModel.findOne(
      { _id: userId.toString(), 'addresses._id': addressId },
      { addresses: 1 },
    );
  }

  updateManyUsersByIds(
    usersIds: string[],
    update?: UpdateQuery<UserDocument>,
    options?: QueryOptions<UserDocument>,
  ) {
    return this.userModel.updateMany({ _id: usersIds }, update, options);
  }

  deleteAddressById(userId: string, addressId: string): Promise<any> {
    return this.userModel.deleteOne({
      _id: userId,
      'addresses._id': addressId,
    });
  }

  findAddressList(userId: string) {
    return this.userModel.findOne({ _id: userId }, { addresses: 1 });
  }
}
