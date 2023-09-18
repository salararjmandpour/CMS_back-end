import {
  HttpStatus,
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

import { RolesEnum } from './schema/user.schema';
import { SmsService } from '../sms/sms.service';
import { FileService } from 'src/modules/file/file.service';
import { MainEmailService } from '../main-email/main-email.service';

import { UserRepository } from './users.repository';
import { ProductsRepository } from '../products/products.repository';

import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateAddressDto } from './dtos/create-address.dto';
import { SetNewPasswordDto } from './dtos/set-new-password.dto';

import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { excludeObjectKeys } from 'src/core/utils/exclude-object-keys.util';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { UpdateAddressDto } from './dtos/update-address.dto';

@ApiBearerAuth()
@Injectable()
export class UsersService {
  constructor(
    private readonly smsService: SmsService,
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
    private readonly mainEmailService: MainEmailService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  // get logged in user
  async getMe(req: Request): Promise<ResponseFormat<any>> {
    try {
      if (!req.user) {
        throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
      }

      const user = await this.userRepository.findByEmail(req.user.email, {
        otp: 0,
        password: 0,
        accessToken: 0,
        refreshToken: 0,
      });

      return { statusCode: HttpStatus.OK, data: { user } };
    } catch (error) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
  }

  // upload user avatar
  async uploadAvatar(
    file: Express.Multer.File,
    id: string,
  ): Promise<ResponseFormat<any>> {
    // check exist file
    if (!file) {
      throw new BadRequestException(ResponseMessages.FILE_IS_REQUIRED);
    }

    const avatar = file?.path?.replace(/\\/g, '/');

    // check exist user
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
    }

    // check if exist prev file, delete it
    if (user?.avatar) {
      this.fileService.deleteFileByPath(user.avatar);
    }

    // update new avatar
    const uploadedAvatar = await this.userRepository.updateById(id, {
      avatar,
    });
    if (uploadedAvatar.modifiedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPLOAD_AVATAR,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.AVATAR_UPLOADED_SUCCESS,
    };
  }

  // delete user avatar
  async deleteAvatar(userId: string): Promise<ResponseFormat<any>> {
    // check exist user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
    }
    const avatar = user.avatar;

    // delete avatar from database
    const updateResult = await this.userRepository.updateById(userId, {
      avatar: null,
    });
    if (updateResult.modifiedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_AVATAR,
      );
    }

    // delete avatar from file system
    this.fileService.deleteFileByPath(avatar);

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.AVATAR_DELETED_SUCCESS,
    };
  }

  // add product in wishlist in user profile
  async addToWishlist(
    userId: string,
    productId: string,
  ): Promise<ResponseFormat<any>> {
    const [existProduct, hasInWishlist] = await Promise.all([
      this.productsRepository.findById(productId),
      this.userRepository.findOneFromWishlist(userId, productId),
    ]);
    if (!existProduct) {
      throw new BadRequestException(ResponseMessages.PRODUCT_NOT_FOUND);
    }
    if (hasInWishlist) {
      throw new BadRequestException(
        ResponseMessages.PRODUCT_ALREADY_EXIST_IN_WISHLIST,
      );
    }

    const updateResult = await this.userRepository.addOneToWishlist(
      userId,
      productId,
      { new: true },
    );
    if (!updateResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_ADD_TO_WISHLIST,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        wishlist: updateResult.wishlist,
      },
    };
  }

  // delete product from wishlist in user profile
  async deleteFromWishlist(userId: string, productId: string) {
    const hasInWishlist = await this.userRepository.findOneFromWishlist(
      userId,
      productId,
    );

    if (!hasInWishlist) {
      throw new BadRequestException(
        ResponseMessages.NOT_FOUND_PRODUCT_IN_WISHLIST,
      );
    }

    const updateResult = await this.userRepository.deleteOneFromWishlist(
      userId,
      productId,
      { new: true },
    );
    if (!updateResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_ADD_TO_WISHLIST,
      );
    }

    return {
      statusCoed: HttpStatus.OK,
      message: ResponseMessages.REMOVED_PRODUCT_FROM_WISHLIST,
    };
  }

  // get wishlist in user profile
  async getWishlist(userId: string) {
    const wishlist = await this.userRepository.findAllWishlist(userId);

    if (!wishlist) {
      throw new BadRequestException(ResponseMessages.FAILED_GET_WISHLIST);
    }

    return {
      statusCoed: HttpStatus.OK,
      wishlist: wishlist.wishlist,
    };
  }

  async getAllUsers(
    role: RolesEnum,
    search: string,
  ): Promise<ResponseFormat<any>> {
    const query: any = {};
    if (role) query.role = role;
    if (search) query['$text'] = { $search: search };

    const users = await this.userRepository.findAllUsers(query, {
      otp: 0,
      password: 0,
      accessToken: 0,
      refreshToken: 0,
      resetPasswordToken: 0,
      resetPasswordExpires: 0,
    });
    if (!users) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_USERS_LIST,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        users,
      },
    };
  }

  async deleteManyUserByIds(usersIds: string[]): Promise<ResponseFormat<any>> {
    //  check exist users
    const users = await this.userRepository.findAllUsers({
      _id: { $in: usersIds },
    });
    if (!users || users?.length !== usersIds.length) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_USERS);
    }

    // delete users in database
    const deleteResult = await this.userRepository.deleteManyByIds(usersIds);
    if (deleteResult.deletedCount !== usersIds.length) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_USERS,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.USERS_DELETED_SUCCESS,
    };
  }

  // update user
  async updateUser(
    userId: string,
    body: UpdateUserDto,
  ): Promise<ResponseFormat<any>> {
    // check exist user and update user
    const [existUser, updatedResult] = await Promise.all([
      this.userRepository.findById(userId),
      this.userRepository.updateById(userId, body),
    ]);

    if (!existUser) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_USERS);
    }
    if (updatedResult.modifiedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_USER,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.USER_UPDATED_SUCCESS,
    };
  }

  // send new password and send(email/sms) for user
  async setNewPassword(body: SetNewPasswordDto): Promise<ResponseFormat<any>> {
    const [user, updatedResult] = await Promise.all([
      this.userRepository.findById(body.id),
      this.userRepository.updateById(body.id, { password: body.password }),
    ]);
    if (!user) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_USERS);
    }
    if (updatedResult.modifiedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SET_NEW_PASSWORD,
      );
    }

    // send password(email/sms) to user
    if (user.email) {
      await this.mainEmailService.sendًPasswordToUser(
        user.email,
        body.password,
      );
    }
    if (user.mobile) {
      await this.smsService.sendPasswordToUser_ippanel(
        user.mobile,
        body.password,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.PASSWORD_SENT_FOR_USER,
    };
  }

  async createUser(body: CreateUserDto): Promise<ResponseFormat<any>> {
    const [duplicatedEmail, duplicatedUsername] = await Promise.all([
      this.userRepository.findByEmail(body.email),
      this.userRepository.findByEmailOrUsername(body.username),
    ]);
    if (duplicatedEmail) {
      throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXIST);
    }
    if (body.username && duplicatedUsername) {
      throw new ConflictException(ResponseMessages.USERNAME_ALREADY_EXIST);
    }

    const user = await this.userRepository.create(body);
    if (!user) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_USER,
      );
    }

    const excludedUser = excludeObjectKeys(
      user,
      'otp',
      'password',
      'accessToken',
      'refreshToken',
      'resetPasswordToken',
      'resetPasswordExpires',
    );

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        user: excludedUser,
      },
    };
  }

  async createAddress(
    userId: string,
    body: CreateAddressDto,
  ): Promise<ResponseFormat<any>> {
    const createdResult = await this.userRepository.createAddress(userId, body);
    if (!createdResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_PASSWORD,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.ADDRESS_CREATED_SUCCESS,
    };
  }

  async updateAddress(
    userId: string,
    addressId: string,
    body: UpdateAddressDto,
  ): Promise<ResponseFormat<any>> {
    const [existUser, existAddress, updatedResult] = await Promise.all([
      this.userRepository.updateById(userId),
      this.userRepository.findAddressById(userId, addressId),
      this.userRepository.updateAddress(userId, addressId, body),
    ]);

    if (!existUser) {
      throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
    }
    console.log({ existAddress });
    if (!existAddress) {
      throw new NotFoundException(ResponseMessages.ADDRESS_NOT_FOUND);
    }
    if (!updatedResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_ADDRESS,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        address: updatedResult,
      },
    };
  }

  async deleteAddressById(
    userId: string,
    addressId: string,
  ): Promise<ResponseFormat<any>> {
    const [existUser, existAddress, deletedResult] = await Promise.all([
      this.userRepository.findById(userId),
      this.userRepository.findAddressById(userId, addressId),
      this.userRepository.deleteAddressById(userId, addressId),
    ]);
    if (!existUser) {
      throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
    }
    if (!existAddress) {
      throw new NotFoundException(ResponseMessages.ADDRESS_NOT_FOUND);
    }
    if (deletedResult.deletedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_ADDRESS,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.ADDRESS_DELETED,
    };
  }

  async getAddressList(userId: string): Promise<ResponseFormat<any>> {
    const addresses = await this.userRepository.findAddressList(userId);
    if (!addresses) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_ADDRESS_LIST,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        addresses: addresses.addresses,
      },
    };
  }
}
