import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCreateOrder = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create order',
      description: 'create order',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          data: {
            order: {
              orderId: 483288832420,
              customer: '64c6556e14ba201e0504a2c3',
              orderDate: '2023-08-21T13:09:59.300Z',
              products: [
                '64e006bca31462ff14ff4410',
                '64e006bca31462ff14ff440e',
                '64e006bca31462ff14ff440d',
              ],
              status: 'IN_PROGRESS',
              address: '64e006bca31462ff14ff440c',
              shippingCost: 0,
              shippingMethod: 'string',
              paymentStatus: 'paid',
              _id: '64e3622b0465fa2561399844',
              createdAt: '2023-08-21T13:10:03.530Z',
              updatedAt: '2023-08-21T13:10:03.530Z',
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
