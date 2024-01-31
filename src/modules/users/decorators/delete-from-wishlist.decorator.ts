import { ApiTags } from '@nestjs/swagger';
import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteFromWishlist } from '../docs/delete-from-wishlist.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const DeleteFromWishlistDecorator = () => {
  return applyDecorators(
    ApiTags('Profile'),
    ApiDeleteFromWishlist(),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    Patch('wishlist/delete/:productId'),
  );
};
