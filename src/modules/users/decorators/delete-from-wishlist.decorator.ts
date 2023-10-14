import { ApiTags } from '@nestjs/swagger';
import { Patch, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiDeleteFromWishlist } from '../docs/delete-from-wishlist.doc';

export const DeleteFromWishlistDecorator = () => {
  return applyDecorators(
    ApiTags('Profile'),
    ApiDeleteFromWishlist(),
    UseGuards(AuthGuard),
    Patch('wishlist/delete/:productId'),
  );
};
