import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const GetSlugConfigDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get slug settings',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            slugSettings: {
              _id: '65c135685184c452580591cc',
              postSettings: {
                category: 'string',
                linkStructures: 'simple',
                link: 'string',
              },
              postLabelSettings: {
                category: 'string',
                linkStructures: 'simple',
                link: 'string',
              },
              productSettings: {
                category: 'string',
                linkStructures: 'simple',
                link: 'string',
              },
              productLabelSettings: {
                category: 'string',
                linkStructures: 'simple',
                link: 'string',
              },
              createdAt: '2024-02-05T19:22:16.887Z',
              updatedAt: '2024-02-05T19:22:16.887Z',
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
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: ResponseMessages.NOT_CONFIGURED_SLUG_SETTINGS,
          error: 'Not Found',
        },
      },
    }),
  );
};
