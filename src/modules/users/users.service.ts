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

  async addToWishlist(userId: string, productId: string) {
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
      statusCoed: HttpStatus.OK,
      data: {
        wishlist: updateResult.wishlist,
      },
    };
  }
}
