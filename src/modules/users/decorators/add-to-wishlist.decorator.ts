import { ApiTags } from '@nestjs/swagger';
import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiAddToWishlist } from '../docs/add-to-wishlist.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const AddToWishlistDecorator = () => {
  return applyDecorators(
    ApiTags('Profile'),
    ApiAddToWishlist(),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    Patch('wishlist/add/:productId'),
  );
};
