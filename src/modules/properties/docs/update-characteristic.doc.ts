import {
  ApiOperation,
  ApiOkResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiUpdateCharacteristic = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'update characteristic',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: ResponseMessages.CHARACTERISTIC_UPDATED_SUCCESS,
        },
      },
    }),
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: ResponseMessages.CHARACTERISTIC_SLUG_ALREADY_EXIST,
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
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: [
            ResponseMessages.NOT_FOUND_PROPERTY,
            ResponseMessages.NOT_FOUND_CHARACTERISTIC,
          ],
          error: 'Not Found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_UPDATE_CHARACTERISTIC,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
