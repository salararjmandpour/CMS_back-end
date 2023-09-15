import {
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UserRepository } from './users.repository';
import { FileService } from 'src/modules/file/file.service';
import { ProductsRepository } from '../products/products.repository';

import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { RolesEnum } from './schema/user.schema';

@ApiBearerAuth()
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly fileService: FileService,
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
    req: Request,
  ): Promise<ResponseFormat<any>> {
    // check exist file
    if (!file) {
      throw new BadRequestException(ResponseMessages.FILE_IS_REQUIRED);
    }

    const userId = req?.user?._id;
    const avatar = file?.path?.replace(/\\/g, '/');

    // check exist user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
    }

    // check if exist prev file, delete it
    if (user?.avatar) {
      this.fileService.deleteFileByPath(user.avatar);
    }

    // update new avatar
    const uploadedAvatar = await this.userRepository.updateById(userId, {
      avatar,
    });
    if (uploadedAvatar.modifiedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPLOAD_AVATAR,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.UPLOADED_AVATAR,
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
      resetPasswordExpires: 0,
      resetPasswordToken: 0,
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
    console.log(users?.length !== usersIds.length);
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
}
