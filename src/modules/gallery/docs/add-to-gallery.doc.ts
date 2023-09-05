import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiAddToGallery = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'add file to gallery',
      description: 'add file to gallery',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          message: 'FILE_ADDED_TO_GALLERY',
          data: {
            file: {
              path: 'uploads/gallery/2023/8/5/f5hkj9ip03cqdk5o.png',
              type: 'image',
              filename: 'f5hkj9ip03cqdk5o.png',
              mimetype: 'image/png',
              size: 421362,
              dimensions: {
                height: 768,
                width: 1366,
                type: 'png',
              },
              alt: 'test',
              title: 'test',
              description: 'test',
              uploadedBy: '64c65aae87bef8606671199e',
              uploadedIn: '64c65aae87bef8606671199e',
              _id: '64f6f9bd215ac8be4286eab4',
              createdAt: '2023-09-05T09:49:49.396Z',
              updatedAt: '2023-09-05T09:49:49.396Z',
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
