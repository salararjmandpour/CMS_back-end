import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiAddToWishlist } from '../docs/add-to-wishlist.doc';

export const AddToWishlistDecorator = () => {
  return applyDecorators(
    ApiTags('Profile'),
    ApiAddToWishlist(),
    UseGuards(AuthGuard),
    Get('wishlist/add/:productId'),
  );
};
