import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetOnePost = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get one post by ID',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          date: {
            post: {
              _id: '65392431b3d1490d3add069a',
              title: 'zzzzzzzzzzzzzzzzzzz',
              description: 'zzzzzzzzzzzzzzzzzzz',
              writer: '6509eb662f34d1564a88cf20',
              view: 0,
              status: 'draft',
              image: 'string',
              categories: [],
              createdAt: '2023-10-25T14:20:33.539Z',
              updatedAt: '2023-10-25T15:14:55.231Z',
            },
            seo: {
              _id: '65392431b3d1490d3add069c',
              title: ['sxxxxdfsdf'],
              slug: 'sdfxxxsdf',
              description: 'sdfsxxxdf',
              post: '65392431b3d1490d3add069a',
              createdAt: '2023-10-25T14:20:33.544Z',
              updatedAt: '2023-10-25T15:14:55.232Z',
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
          message: ResponseMessages.NOT_FOUND_POST,
          error: 'Not Found',
        },
      },
    }),
  );
};
