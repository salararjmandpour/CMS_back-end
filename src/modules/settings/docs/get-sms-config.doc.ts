import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const GetSmsConfigDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get sms settings',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            smsSettings: {
              _id: '65c114a4f26d76cb8f9564dc',
              panel: 'farazsms.ir',
              username: 'string',
              password: '51csvs4s5d',
              senderNumber: '+985000404223',
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
          message: ResponseMessages.NOT_FOUND_SMS_CONFIG,
          error: 'Not Found',
        },
      },
    }),
  );
};
