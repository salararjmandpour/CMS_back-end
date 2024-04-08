import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiUpdateSublable = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'update sublable',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: 'SUBLABELS_UPDATED_SUCCESS',
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
          statusCode: 404,
          message: ['NOT_FOUND_LABEL', 'NOT_FOUND_SUBLABELS'],
          error: 'Not Found',
        },
      },
    }),
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: 'SUBLABEL_SLUG_ALREADY_EXIST',
          error: 'Conflict',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'FAILED_UPDATE_SUBLABELS',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
