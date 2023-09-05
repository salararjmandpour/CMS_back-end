import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiUpdateInGallery = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'update file in gallery',
      description: 'update file in gallery',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          message: 'FILE_UPDATED_IN_GALLERY',
          data: {
            file: {
              path: 'uploads/gallery/2023/7/31/n8aq8j9unlqlaya2.jpg',
              type: 'image',
              size: 115183,
              dimensions: {
                height: 2880,
                width: 5120,
                type: 'jpg',
              },
              alt: 'مانيتور مخصوص بازی جی پلاس مدل GGM-L328QN سايز 32 اينچ',
              title: 'مانيتور جی پلاس',
              description:
                'مانيتور مخصوص بازی جی پلاس مدل GGM-L328QN سايز 32 اينچ',
              _id: '64f07cf0aeedb01979b21bc4',
              createdAt: '2023-08-31T11:43:44.599Z',
              updatedAt: '2023-08-31T11:43:44.599Z',
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
