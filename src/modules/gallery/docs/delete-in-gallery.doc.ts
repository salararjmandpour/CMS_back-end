import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiDeleteInGallery = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'delete file in gallery',
      description: 'delete file in gallery',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          message: ResponseMessages.FILE_DELETED_IN_GALLERY,
          data: {
            file: {
              src: 'uploads/gallery/xszd4az2tvs6l2db.mp3',
              type: 'audio',
              _id: '64e766f4e6edc2b07f650afe',
              createdAt: '2023-08-24T14:19:32.838Z',
              updatedAt: '2023-08-24T14:19:32.838Z',
            },
          },
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
          message: ResponseMessages.BAD_REQUEST,
          error: 'Bad Request',
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
