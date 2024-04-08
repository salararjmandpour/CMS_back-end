import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiRefreshToken = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'refresh token',
      description:
        'Enter refreshToken for get new accessToken and new refreshToken',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          data: {
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2NTU2ZTE0YmEyMDFlMDUwNGEyYzMiLCJpYXQiOjE2OTA3MjA1ODMsImV4cCI6MTY5MzMxMjU4M30.U6i35GjJY-e4Mb6YqX7InUu8782WSWujXpx2vqka_u8',
            refreshToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2NTU2ZTE0YmEyMDFlMDUwNGEyYzMiLCJpYXQiOjE2OTA3MTk2NDIsImV4cCI6MTcyMjI3NzI0Mn0.FsTf30XMb_v05otUWQ0nD54cZ3SqRYAoGv5NgfMo4tY',
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: 401,
          message: ResponseMessages.UNAUTHORIZED,
          error: 'Unauthorized',
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: 400,
          message: ResponseMessages.BAD_REQUEST,
          error: 'Bad Request',
        },
      },
    }),
  );
};
