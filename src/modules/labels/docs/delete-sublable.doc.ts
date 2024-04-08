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

export const ApiDeleteSublable = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'update sublable',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: 'SUBLABEL_DELETED_SUCCESS',
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
          message: 'NOT_FOUND_LABELS',
          error: 'Not Found',
        },
      },
    }),
  );
};
