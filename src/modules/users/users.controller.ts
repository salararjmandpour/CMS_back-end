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
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';
import { SetNewPasswordDto } from './dtos/set-new-password.dto';
import { DeleteManyUsersDto } from './dtos/delete-many-users.dto';

import { GetMeDecorator } from './decorators/get-me.decorator';
import { UpdateUserDecorator } from './decorators/update-user.decorator';
import { CreateUserDecorator } from './decorators/create-user.decorator';
import { GetWishlistDecorator } from './decorators/get-wishlist.decorator';
import { UploadAvatarDecorator } from './decorators/upload-avatar.decorator';
import { DeleteAvatarDecorator } from './decorators/delete-avatar.decorator';
import { getUsersListDecorator } from './decorators/get-users-list.decorator';
import { UpdateAddressDecorator } from './decorators/update-address.decorator';
import { CreateAddressDecorator } from './decorators/create-address.decorator';
import { DeleteAddresstDecorator } from './decorators/delete-address.decorator';
import { AddToWishlistDecorator } from './decorators/add-to-wishlist.decorator';
import { DeleteManyUserDecorator } from './decorators/delete-many-user.decorator';
import { GteAddressListDecorator } from './decorators/get-address-list.decorator';
import { SetNewPasswordDecorator } from './decorators/set-new-password.decorator';
import { DeleteFromWishlistDecorator } from './decorators/delete-from-wishlist.decorator';

import { updateUserValidator } from './validator/update-user.validator';
import { updateAddressValidator } from './validator/update-address.validator';

import { joiValidation } from 'src/core/utils/joi-validator.util';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';

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
    joiValidation(updateUserValidator, body);
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

  @CreateAddressDecorator()
  create(@Body() body: CreateAddressDto, @Req() req: Request) {
    const userId = req.user._id;
    return this.usersService.createAddress(userId, body);
  }

  // update one address by userId and addressId in user profile
  @UpdateAddressDecorator()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateAddressDto,
    @Req() req: Request,
  ) {
    joiValidation(updateAddressValidator, body);
    const userId = req.user?._id;
    return this.usersService.updateAddress(userId, id, body);
  }

  // delete address by userId and addressId in user profile
  @DeleteAddresstDecorator()
  deleteOne(@Param('id', ParseObjectIdPipe) id: string, @Req() req: Request) {
    const userId = req.user?._id;
    return this.usersService.deleteAddressById(userId, id);
  }

  // get address list by userId in user profile
  @GteAddressListDecorator()
  getAddressList(@Req() req: Request) {
    const userId = req.user?._id;
    return this.usersService.getAddressList(userId);
  }
}
