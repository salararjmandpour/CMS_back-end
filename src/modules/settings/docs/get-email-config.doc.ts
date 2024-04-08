import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const GetEmailConfigDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get email settings',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            emailSettings: {
              _id: '65bcad2f2623e8cd4d1df167',
              host: 'irweb.ir',
              port: '354',
              user: 'test@irweb.ir',
              pass: 'D9)F?d4%6Q&5',
              senderEmail: 'test@test.com',
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
          message: ResponseMessages.NOT_CONFIGURED_EMAIL_SETTINGS,
          error: 'Not Found',
        },
      },
    }),
  );
};
