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
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTA1NDUzODcyMCIsImlhdCI6MTY5MDI5MDc3OSwiZXhwIjoxNjkyODgyNzc5fQ.Hf7fUFbzwY3XGY_fx8SirUQM_Hav0Nsv_M1wG7QidN0',
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
