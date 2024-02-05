import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const SetSmsConfigDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'set sms settings',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          data: {
            smsSettings: {
              panel: 'farazsms.ir',
              username: 'string',
              password: '51csvs4s5d',
              senderNumber: '+985000404223',
              _id: '65c114a4f26d76cb8f9564dc',
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
            ResponseMessages.FAILED_CREATE_SMS_CONFIG,
            ResponseMessages.FAILED_SET_CONFIG_SMS,
          ],
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
