import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Param, Req, UploadedFile } from '@nestjs/common';

import { UsersService } from './users.service';
import { GetMeDecorator } from './decorators/get-me.decorator';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { UploadAvatarDecorator } from './decorators/upload-avatar.decorator';
import { AddToWishlistDecorator } from './decorators/add-to-wishlist.decorator';
import { DeleteFromWishlistDecorator } from './decorators/delete-from-wishlist.decorator';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @GetMeDecorator()
  getMe(@Req() req: Request) {
    return this.usersService.getMe(req);
  }

  @UploadAvatarDecorator()
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.usersService.uploadAvatar(file, req);
  }

  @AddToWishlistDecorator()
  addToWishlist(
    @Param('productId', ParseObjectIdPipe) productId: string,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;
    return this.usersService.addToWishlist(userId, productId);
  }

  @DeleteFromWishlistDecorator()
  deleteFromWishlist(
    @Param('productId', ParseObjectIdPipe) productId: string,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;
    return this.usersService.deleteFromWishlist(userId, productId);
  }
}
