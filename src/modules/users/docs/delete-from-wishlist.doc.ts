import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiDeleteFromWishlist = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'delete product from wishlist',
      description: 'delete product from wishlist by productId',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: ResponseMessages.REMOVED_PRODUCT_FROM_WISHLIST,
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.BAD_REQUEST,
          error: 'Bad Request',
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
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: ResponseMessages.NOT_FOUND_PRODUCT_IN_WISHLIST,
          error: 'Not Found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_ADD_TO_WISHLIST,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
