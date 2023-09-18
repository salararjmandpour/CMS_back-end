import {
  ApiOperation,
  ApiOkResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiUpdateCategory = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'update category',
      description: 'update category by id',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            product: {
              _id: '64e1338d1b15ee6ac6897ba3',
              title: 'تجهیرات پزشکی',
              slug: 'medical-equipment',
              image: 'uploads/category/2023/8/19/n9n41mx8mxgbkv4p.png',
              description: 'This is test message',
              parent: '6470a3fbbb82534053e8bb86',
              createdAt: '2023-08-19T21:26:37.181Z',
              updatedAt: '2023-08-19T21:26:37.181Z',
            },
          },
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
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: [
            ResponseMessages.CATEGORY_NOT_FOUND,
            ResponseMessages.TITLE_ALREADY_EXIST,
            ResponseMessages.SLUG_ALREADY_EXIST,
          ],
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_UPDATE_CATEGORY,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
