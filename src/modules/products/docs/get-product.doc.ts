import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetProduct = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get one product by ID',
      description: 'get product',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            product: {
              statusCode: 200,
              data: {
                product: {
                  _id: '64df800ebe2064f42a82d6bd',
                  productId: '288453296',
                  title: 'مچ بند هوشمند مدل M4',
                  description: 'string',
                  shortDescription: 'string',
                  price: 250000,
                  discount: 0,
                  count: 0,
                  supplier: '64c6556e14ba201e0504a2c3',
                  comments: [],
                  size: {
                    length: '60',
                    height: '20',
                    width: '40',
                    weight: '2',
                    weightUnit: 'kg',
                    dimensionsUnit: 'cm',
                    _id: '64df800ebe2064f42a82d6be',
                  },
                  images: [],
                  inStock: true,
                  category: '6470a3fbbb82534053e8bb86',
                  specifications: [
                    {
                      key: 'نوع',
                      value: 'ضد حساسیت',
                      _id: '64df800ebe2064f42a82d6bf',
                    },
                  ],
                  createdAt: '2023-08-18T14:28:30.525Z',
                  updatedAt: '2023-08-18T14:28:30.525Z',
                },
              },
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
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: ResponseMessages.PRODUCT_NOT_FOUND,
          error: 'Bad Request',
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
