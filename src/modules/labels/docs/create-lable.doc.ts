import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCreateLable = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create lable',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          message: 'LABEL_CREATED_SUCCESS',
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.PLEASE_ENTER_A_DISCOUNT_CODE,
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
          message: 'LABEL_SLUG_ALREADY_EXIST',
          error: 'Conflict',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'FAILED_CREATE_LABEL',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
