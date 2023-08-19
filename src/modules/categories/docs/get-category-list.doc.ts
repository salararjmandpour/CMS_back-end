import {
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetCategoryList = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get category list',
      description: 'get category list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            product: [
              {
                _id: '64e1338d1b15ee6ac6897ba3',
                title: 'تجهیرات پزشکی',
                name: 'medical-equipment',
                disabled: false,
                parent: '6470a3fbbb82534053e8bb86',
                createdAt: '2023-08-19T21:26:37.181Z',
                updatedAt: '2023-08-19T21:26:37.181Z',
              },
            ],
          },
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
