import {
  ApiQuery,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetSheetList = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get sheet list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          date: {
            sheets: [
              {
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
            ],
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

    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAIELD_GET_SHEET_LIST,
          error: 'Internal Server Error',
        },
      },
    }),

    ApiQuery({ name: 'status', required: false }),
    ApiQuery({ name: 'search', required: false }),
    ApiQuery({ name: 'startDate', required: false }),
    ApiQuery({ name: 'endDate', required: false }),
  );
};
