import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetOneSheet = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get one sheet by ID',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          date: {
            category: {
              _id: '6538e618dfa0a6e071424a55',
              title: 'string',
              description: 'string',
              writer: '6509eb662f34d1564a88cf20',
              view: 0,
              status: 'published',
              image: 'string',
              createdAt: '2023-10-25T09:55:36.626Z',
              updatedAt: '2023-10-25T09:55:36.626Z',
            },
            seo: {
              _id: '6538e618dfa0a6e071424a57',
              title: [],
              slug: '',
              description: '',
              sheet: '6538e618dfa0a6e071424a55',
              createdAt: '2023-10-25T09:55:36.640Z',
              updatedAt: '2023-10-25T09:55:36.640Z',
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
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: ResponseMessages.NOT_FOUND_SHEET,
          error: 'Not Found',
        },
      },
    }),
  );
};
