import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiGetUsersList = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get users list',
      description: 'get users list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          users: [
            {
              _id: '64fdb08e7a7e91f98b47b936',
              mobile: '09054538720',
              email: 'askarpourdev@gmail.com',
              authProvider: 'LOCAL',
              password:
                '$2a$10$98k6M7j46UaahWt0RQ/x3exMLhLU12BEEqZf.zC62xW.iblHxO4ou',
              otp: {
                code: '0',
                expiresIn: 0,
              },
              role: 'SUPERADMIN',
              avatar: '',
              wishlist: [],
              createdAt: '2023-09-10T12:03:26.920Z',
              updatedAt: '2023-09-12T14:09:47.402Z',
              resetPasswordExpires: null,
              resetPasswordToken: null,
            },
          ],
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: 401,
          message: 'UNAUTHORIZED',
          error: 'Unauthorized',
        },
      },
    }),
  );
};
