import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCreateSublable = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create sublable',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          message: 'SUBLABELS_CREATED_SUCCESS',
        },
      },
    }),
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: 404,
          message: 'NOT_FOUND_LABEL',
          error: 'Not Found',
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
          message: 'SUBLABELS_SLUG_ALREADY_EXIST',
          error: 'Conflict',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'FAILED_CREATE_SUBLABELS',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
