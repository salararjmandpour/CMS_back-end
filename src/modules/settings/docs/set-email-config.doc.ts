import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const SetEmailConfigDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'set email settings',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
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
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [
            ResponseMessages.FAILED_CREATE_EMAIL_CONFIG,
            ResponseMessages.FAILED_SET_CONFIG_EMAIL,
          ],
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
