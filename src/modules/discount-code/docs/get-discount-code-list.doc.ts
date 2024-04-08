import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetDiscountCodeList = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get discount code list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            discountCodes: [
              {
                _id: '65778f27c55f81172ce112e4',
                discountCode: 'testxcxxcv04551',
                description: 'string',
                used: 0,
                type: 'PERCENTAGE_DISCOUNT',
                discountPercentage: 0,
                expireDate: '2023-12-11T22:38:59.102Z',
                minCost: 0,
                maxCost: 0,
                individualUse: true,
                exceptBestsellerProduct: true,
                products: ['65741e0289848dda5a13ab3e'],
                exceptProducts: ['65741e0289848dda5a13ab3e'],
                categories: ['65741e0289848dda5a13ab3e'],
                exceptCategirues: ['65741e0289848dda5a13ab3e'],
                maxUse: 0,
                XItemUseLimit: 0,
                userConsumptionLimit: 0,
                createdAt: '2023-12-11T22:37:27.118Z',
                updatedAt: '2023-12-11T22:42:01.145Z',
              },
            ],
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
  );
};
