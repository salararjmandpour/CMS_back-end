import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiLogout = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Logout user',
      description: 'please set accessToken and refreshToken in request headers',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          message: ResponseMessages.LOGOUTED_SUCCESS,
        },
      },
    }),
  );
};
