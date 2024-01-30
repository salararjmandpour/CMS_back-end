import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetPublicConfig = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get public settings',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            emailConfig: {
              _id: '65b8f4d611036664e2e05c5b',
              siteTitle: 'mamad',
              description: 'test',
              email: 'askarpourdev@gmail.com',
              siteAddress: 'www.google.com',
              routeAddress: 'www.google.com/',
              role: 'CUSTOMER',
              timezone: 'Asia/Tehran',
              createdAt: '2024-01-30T13:08:38.082Z',
              updatedAt: '2024-01-30T13:22:51.099Z',
              localTime: '۱۴۰۲/۱۱/۱۰, ۱۶:۵۲:۵۴',
              utcTime: '1/30/2024, 1:22:54 PM',
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
          message: ResponseMessages.NOT_CONFIGURED_PUBLIC_SETTINGS,
          error: 'Not Found',
        },
      },
    }),
  );
};
