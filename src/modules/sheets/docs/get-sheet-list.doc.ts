import {
  ApiQuery,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetSheetList = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get sheet list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          date: {
            sheets: [],
          },
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

    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_UPDATE_SHEET,
          error: 'Internal Server Error',
        },
      },
    }),

    ApiQuery({ name: 'status', required: false }),
    ApiQuery({ name: 'search', required: false }),
    ApiQuery({ name: 'startDate', required: false }),
    ApiQuery({ name: 'endDate', required: false }),
  );
};
