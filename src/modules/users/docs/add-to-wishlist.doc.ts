import {
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiAddToWishlist = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'add product to wishlist',
      description: 'add product to wishlist by productId',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          data: {
            _id: '64e006bca31462ff14ff440a',
            productId: 'MT01424',
            title: 'ﭼﺴﺐ ﺿﺪ ﺣﺴﺎﺳﯿﺖ ۱.۲۵ سانتی متر ﻣﺎرﺗﺎ',
            description: 'string',
            shortDescription: 'string',
            slug: 'test-chasbe-zed-hasasiat-marta',
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
              _id: '64e006bca31462ff14ff440b',
            },
            images: [
              'uploads/products/6gu8xvjmjv5if4xi.png',
              'uploads/products/c2mix1szitawekjb.png',
            ],
            inStock: true,
            category: '6470a3fbbb82534053e8bb86',
            specifications: [
              {
                key: 'نوع',
                value: 'ضد حساسیت',
                _id: '64e006bca31462ff14ff440c',
              },
              {
                key: 'نوع',
                value: 'ضد حساسیت',
                _id: '64e006bca31462ff14ff440d',
              },
              {
                key: 'نوع',
                value: 'ضد حساسیت',
                _id: '64e006bca31462ff14ff440e',
              },
              {
                key: 'نوع',
                value: 'ضد حساسیت',
                _id: '64e006bca31462ff14ff440f',
              },
              {
                key: 'نوع',
                value: 'ضد حساسیت',
                _id: '64e006bca31462ff14ff4410',
              },
            ],
            createdAt: '2023-08-19T00:03:09.016Z',
            updatedAt: '2023-08-19T12:33:10.420Z',
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
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: ResponseMessages.PRODUCT_NOT_FOUND,
          error: 'Not Found',
        },
      },
    }),
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: ResponseMessages.PRODUCT_ALREADY_EXIST_IN_WISHLIST,
          error: 'Conflict',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_ADD_TO_WISHLIST,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
