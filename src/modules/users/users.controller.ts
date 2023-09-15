import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';

import { GetMeDecorator } from './decorators/get-me.decorator';
import { GetWishlistDecorator } from './decorators/get-wishlist.decorator';
import { UploadAvatarDecorator } from './decorators/upload-avatar.decorator';
import { AddToWishlistDecorator } from './decorators/add-to-wishlist.decorator';
import { DeleteFromWishlistDecorator } from './decorators/delete-from-wishlist.decorator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { getUsersListDecorator } from './decorators/get-users-list.decorator';
import { DeleteManyUsersDto } from './dtos/delete-many-users.dto';
import { DeleteManyUserDecorator } from './decorators/delete-many-user.decorator';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // get logged in user
  @GetMeDecorator()
  getMe(@Req() req: Request) {
    return this.usersService.getMe(req);
  }

  // upload avatar in user profile
  @UploadAvatarDecorator()
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.usersService.uploadAvatar(file, req);
  }

  // add product in wishlist in user profile
  @AddToWishlistDecorator()
  addToWishlist(
    @Param('productId', ParseObjectIdPipe) productId: string,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;
    return this.usersService.addToWishlist(userId, productId);
  }

  // delete product from wishlist in user profile
  @DeleteFromWishlistDecorator()
  deleteFromWishlist(
    @Param('productId', ParseObjectIdPipe) productId: string,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;
    return this.usersService.deleteFromWishlist(userId, productId);
  }

  // get wishlist in user profile
  @GetWishlistDecorator()
  getWishlist(@Req() req: Request) {
    const userId = req.user?.id;
    return this.usersService.getWishlist(userId);
  }

  @getUsersListDecorator()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  // delete one or many users by IDs
  @DeleteManyUserDecorator()
  deleteManyUserByIds(@Body() body: DeleteManyUsersDto) {
    return this.usersService.deleteManyUserByIds(body.usersIds);
  }
}
