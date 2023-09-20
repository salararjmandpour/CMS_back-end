import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiSetNewPassword = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'set new password for user (admin pannel)',
      description: 'set new password for user (admin pannel)',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: ResponseMessages.PASSWORD_SENT_FOR_USER,
        },
      },
    }),
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: ResponseMessages.USER_NOT_FOUND,
          error: 'Not Found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [
            ResponseMessages.FAILED_SET_NEW_PASSWORD,
            ResponseMessages.FAILED_SEND_PASSWORD_SMS,
            ResponseMessages.FAILED_SEND_PASSWORD_EMAIL,
          ],
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
