import {
  ApiOperation,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
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
          message: ResponseMessages.CATEGORY_CREATED_SUCCESS,
          data: {
            category: {
              title: 'تجهیرات پزشکی',
              slug: 'medical-equipment',
              description: 'category',
              _id: '6517df1c9f752bd69fcfe15f',
              createdAt: '2023-09-30T08:41:00.983Z',
              updatedAt: '2023-09-30T08:41:00.983Z',
            },
            seo: {
              title: ['test'],
              slug: 'this-is-test-message',
              description: 'this is test message for description',
              category: '6517df1c9f752bd69fcfe15f',
              _id: '6517df1c9f752bd69fcfe161',
              createdAt: '2023-09-30T08:41:00.993Z',
              updatedAt: '2023-09-30T08:41:00.993Z',
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
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: ResponseMessages.PARENT_CATEGORY_NOT_FOUND,
          error: 'Not Found',
        },
      },
    }),
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: [
            ResponseMessages.CATEGORY_TITLE_ALREADY_EXIST,
            ResponseMessages.CATEGORY_SLUG_ALREADY_EXIST,
            ResponseMessages.SEO_SLUG_ALREADY_EXIST,
          ],
          error: 'Conflict',
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
