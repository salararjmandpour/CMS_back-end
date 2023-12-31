import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiFindProperties = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get properties list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            properties: [
              {
                _id: '65907d0af93ef4207379834e',
                name: 'سایز',
                slug: 'size',
                description: 'This is test message for size',
                characteristics: [
                  {
                    name: 'test',
                    slug: 'test',
                    description: 'test',
                    color: 'test',
                    image: 'test',
                    equivalent: 0,
                    _id: '65914d3be3cb47cc72ffc5dc',
                  },
                ],
                createdAt: '2023-12-30T20:26:50.560Z',
                updatedAt: '2023-12-30T20:26:50.560Z',
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
