import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCheckOTP = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'check otp',
      description: 'Returns a jwt token',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          data: {
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2NWFhZTg3YmVmODYwNjY3MTE5OWUiLCJpYXQiOjE2OTM5MDQxODYsImV4cCI6MTY5NjQ5NjE4Nn0.SqoKhC8b11LOkfI0PzuKphzrdW9_cLQs3q_vqZvdrzw',
            refreshToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3YzZiZTdjZDk4NDU5OTNjODgyM2QiLCJpYXQiOjE2OTM0ODY3ODcsImV4cCI6MTY5NjA3ODc4N30.Gm4dkNIwt_1TNaim83wYkZDqeOWvXL2yS75DvLO9fIc',
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
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: ResponseMessages.USER_NOT_FOUND,
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.INTERNAL_SERVER_ERROR,
        },
      },
    }),
  );
};
