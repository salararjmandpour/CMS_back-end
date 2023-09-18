import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiUpdateAddress = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'update address by ID',
      description: 'update address by ID',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          data: {
            address: {
              user: '64c6556e14ba201e0504a2c3',
              first_name: 'آرتا',
              last_name: 'خوشبین',
              mobile: 9054538720,
              telephone: 2191093003,
              titleAddress: 'خانه',
              state: 'فارس',
              city: 'شیراز',
              postalAddress: 'فارس - شیراز - معالی آباد - خیابان نسترن 2',
              postalCode: 6286428652,
              _id: '64e22d606bc4d8e51734a06e',
              createdAt: '2023-08-20T15:12:32.593Z',
              updatedAt: '2023-08-20T15:12:32.593Z',
            },
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
