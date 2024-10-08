import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const SetSlugConfigDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'set slug settings',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          data: {
            slugSettings: {
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
              _id: '65c135685184c452580591cc',
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
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [
            ResponseMessages.FAILED_CREATE_SLUG_CONFIG,
            ResponseMessages.FAILED_SET_CONFIG_SLUG,
          ],
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
