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
import { SetNewPasswordDto } from './dtos/set-new-password.dto';
import { SetNewPasswordDecorator } from './decorators/set-new-password.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserDecorator } from './decorators/create-user.decorator';

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

  // set new password for new by superadmin (admin pannel)
  @SetNewPasswordDecorator()
  setNewPassword(@Body() body: SetNewPasswordDto) {
    return this.usersService.setNewPassword(body);
  }

  // update user profile by superadmin (admin pannel)
  @UpdateUserDecorator()
  updateUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, body);
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

  // craete user (admin panel)
  @CreateUserDecorator()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
}
