import {
  ApiOperation,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiCreateUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create user',
      description: 'create user',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          data: {
            user: {
              firstName: 'Alireza',
              lastName: 'Askarpour',
              email: 'sdfsdfaskarspour@gmail.com',
              authProvider: 'OTP',
              role: 'USER',
              avatar: null,
              nationality: 'iranian',
              gender: 'male',
              nationalId: '1870872205',
              addresses: [
                {
                  first_name: 'آرتا',
                  last_name: 'خوشبین',
                  mobile: '09054538720',
                  telephone: '02191093003',
                  titleAddress: 'خانه',
                  state: 'فارس',
                  city: 'شیراز',
                  postalAddress: 'فارس - شیراز - معالی آباد - خیابان نسترن 2',
                  postalCode: '6286428652',
                },
              ],
              birthdate: '1383/02/26',
              wishlist: [],
              _id: '65084870d4ff418a4a342ac0',
              createdAt: '2023-09-18T12:54:08.597Z',
              updatedAt: '2023-09-18T12:54:08.597Z',
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.BAD_REQUEST,
          error: 'Bad Request',
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
    ApiConflictResponse({
      schema: {
        example: {
          statusCode: HttpStatus.CONFLICT,
          message: [
            ResponseMessages.EMAIL_ALREADY_EXIST,
            ResponseMessages.USERNAME_ALREADY_EXIST,
          ],
          error: 'Conflict',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.FAILED_CREATE_USER,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
