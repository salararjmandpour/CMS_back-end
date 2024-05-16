import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
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
            category: {
              _id: '650df968ec94570f8ec35d55',
              title: 'تجهیرات پزشکی',
              slug: 'medical-equipment-test',
              description: {"key": "value"},
              createdAt: '2023-09-22T20:30:32.689Z',
              updatedAt: '2023-09-30T09:12:41.695Z',
              parent: '650dfa8625ebf8e25d178892',
            },
            seo: {
              title: ['test'],
              slug: 'test-category-seo-slug',
              description: {"key": "value"},
              category: '650df968ec94570f8ec35d55',
              _id: '6517e689b79cdd3e9f106cda',
              createdAt: '2023-09-30T09:12:41.719Z',
              updatedAt: '2023-09-30T09:12:41.719Z',
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
          message: [
            ResponseMessages.CATEGORY_NOT_FOUND,
            ResponseMessages.PARENT_CATEGORY_NOT_FOUND,
          ],
        },
      },
    }),
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: [
            ResponseMessages.CATEGORY_TITLE_ALREADY_EXIST,
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
