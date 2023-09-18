import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCreateCategory = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create category',
      description: 'create category',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          data: {
            product: {
              _id: '64e1338d1b15ee6ac6897ba3',
              title: 'تجهیرات پزشکی',
              name: 'medical-equipment',
              image: 'uploads/category/2023/8/19/n9n41mx8mxgbkv4p.png',
              description: 'this is test message',
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
          message: [
            ResponseMessages.BAD_REQUEST,
            ResponseMessages.FILE_IS_REQUIRED,
          ],
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
            ResponseMessages.TITLE_ALREADY_EXIST,
            ResponseMessages.SLUG_ALREADY_EXIST,
            ResponseMessages.PARENT_CATEGORY_NOT_FOUND,
          ],
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_CREATE_CATEGORY,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
