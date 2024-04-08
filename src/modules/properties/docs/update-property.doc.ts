import {
  ApiOperation,
  ApiOkResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiUpdateProperty = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'update a property by id',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: ResponseMessages.PROPERTY_UPDATED_SUCCESS,
        },
      },
    }),
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: ResponseMessages.PROPERTY_SLUG_ALREADY_EXIST,
          error: 'Conflict',
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
          message: ResponseMessages.FAILED_UPDATE_PROPERTY,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
