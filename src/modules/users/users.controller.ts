import {
  Req,
  Body,
  Param,
  Query,
  Controller,
  UploadedFile,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { RolesEnum } from './schema/user.schema';

import { UpdateUserDto } from './dtos/update-user.dto';
import { DeleteManyUsersDto } from './dtos/delete-many-users.dto';

import { GetMeDecorator } from './decorators/get-me.decorator';
import { UpdateUserDecorator } from './decorators/update-user.decorator';
import { GetWishlistDecorator } from './decorators/get-wishlist.decorator';
import { UploadAvatarDecorator } from './decorators/upload-avatar.decorator';
import { getUsersListDecorator } from './decorators/get-users-list.decorator';
import { AddToWishlistDecorator } from './decorators/add-to-wishlist.decorator';
import { DeleteManyUserDecorator } from './decorators/delete-many-user.decorator';
import { DeleteFromWishlistDecorator } from './decorators/delete-from-wishlist.decorator';

import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { DeleteAvatarDecorator } from './decorators/delete-avatar.decorator';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // get logged in user
  @GetMeDecorator()
  getMe(@Req() req: Request) {
    return this.usersService.getMe(req);
  }

  // upload avatar for user profile
  @UploadAvatarDecorator()
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Query('id', ParseObjectIdPipe) id: string,
  ) {
    return this.usersService.uploadAvatar(file, id);
  }

  // delete avatar for user profile
  @DeleteAvatarDecorator()
  deleteAvatar(@Query('id', ParseObjectIdPipe) id: string) {
    return this.usersService.deleteAvatar(id);
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
  getUsers(@Query('role') role: RolesEnum, @Query('search') search: string) {
    return this.usersService.getAllUsers(role, search);
  }

  // delete one or many users by IDs
  @DeleteManyUserDecorator()
  deleteManyUserByIds(@Body() body: DeleteManyUsersDto) {
    return this.usersService.deleteManyUserByIds(body.usersIds);
  }

  @UpdateUserDecorator()
  updateUser(
    @Body() body: UpdateUserDto,
    @Param('userId', ParseObjectIdPipe) userId: string,
  ) {
    return this.usersService.updateUser(userId, body);
  }
}
