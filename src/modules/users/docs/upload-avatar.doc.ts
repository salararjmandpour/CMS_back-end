import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiUploadAvatar = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'upload user avatar',
      description: `upload a photo for user avatar`,
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: ResponseMessages.AVATAR_UPLOADED_SUCCESS,
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
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.FILE_IS_REQUIRED,
          error: 'Bad Request',
        },
      },
    }),
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: ResponseMessages.USER_NOT_FOUND,
          error: 'Not Found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_UPLOAD_AVATAR,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
