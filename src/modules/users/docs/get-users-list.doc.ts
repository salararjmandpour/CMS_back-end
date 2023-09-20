import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetUsersList = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get users list (admin panel)',
      description: 'get users list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          users: [
            {
              _id: '64fdb08e7a7e91f98b47b936',
              mobile: '09054538720',
              email: 'askarpourdev@gmail.com',
              authProvider: 'LOCAL',
              role: 'SUPERADMIN',
              avatar: null,
              wishlist: [],
              createdAt: '2023-09-10T12:03:26.920Z',
              updatedAt: '2023-09-12T14:09:47.402Z',
            },
          ],
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: 401,
          message: 'UNAUTHORIZED',
          error: 'Unauthorized',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: 500,
          message: ResponseMessages.FAILED_GET_USERS_LIST,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
