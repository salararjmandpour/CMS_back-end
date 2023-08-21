import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiAddToWishlist = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'add product to wishlist',
      description: 'add product to wishlist by productId',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          data: {},
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
          error: 'Unauthorized',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
