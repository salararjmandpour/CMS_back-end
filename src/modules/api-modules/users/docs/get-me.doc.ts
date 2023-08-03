import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetMe = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get loggedin user',
      description: 'get loggedin user',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          user: {
            _id: '64bfb641c5b91ecf9f5271f5',
            mobile: '09054538720',
            role: 'USER',
            avatar: '',
            createdAt: '2023-07-25T11:47:13.880Z',
            updatedAt: '2023-07-25T15:38:57.170Z',
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
