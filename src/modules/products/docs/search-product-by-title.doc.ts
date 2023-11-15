import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const SearchByTitleDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'search product by title',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            products: [
              {
                _id: '64df800ebe2064f42a82d6bd',
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
                createdAt: '2023-08-18T14:28:30.525Z',
                updatedAt: '2023-08-18T14:28:30.525Z',
              },
            ],
          },
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.TITLE_IS_REQUIRED,
          error: 'Bad Request',
        },
      },
    }),
  );
};
