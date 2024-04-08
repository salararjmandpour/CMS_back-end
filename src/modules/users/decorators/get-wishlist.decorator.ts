import { ApiTags } from '@nestjs/swagger';
import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiGetWishlist } from '../docs/get-wishlist.doc';

export const GetWishlistDecorator = () => {
  return applyDecorators(
    ApiTags('Profile'),
    ApiGetWishlist(),
    UseGuards(AuthGuard),
    Get('wishlist'),
  );
};
