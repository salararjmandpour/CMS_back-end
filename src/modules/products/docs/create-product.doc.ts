import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCreateProduct = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create product',
      description: 'create product',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          data: {
            product: {
              productId: '288453296',
              title: 'مچ بند هوشمند مدل M4',
              description: 'string',
              shortDescription: 'string',
              slug: 'chasbe-zed-hasasiat-marta',
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
              _id: '64df800ebe2064f42a82d6bd',
              createdAt: '2023-08-18T14:28:30.525Z',
              updatedAt: '2023-08-18T14:28:30.525Z',
            },
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
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.BAD_REQUEST,
          error: 'Bad Request',
        },
      },
    }),
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: ResponseMessages.PRODUCT_ID_ALREADY_EXIST,
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.INTERNAL_SERVER_ERROR,
        },
      },
    }),
  );
};
