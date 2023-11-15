import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiAddToGallery = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'add many file to gallery',
      description: 'add many file to gallery',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          message: 'FILES_ADDED_TO_GALLERY',
          data: {
            files: [
              {
                path: 'uploads/gallery/2023/10/15/tvwlst30cxl0ejyb.jpg',
                type: 'image',
                filename: 'tvwlst30cxl0ejyb.jpg',
                mimetype: 'image/jpeg',
                size: 99148,
                dimensions: {
                  height: 1080,
                  width: 1080,
                  type: 'jpg',
                },
                uploadedBy: '6509eb662f34d1564a88cf20',
                uploadedIn: '6509eb662f34d1564a88cf20',
                _id: '655520b0308f318cc9f99ba4',
                createdAt: '2023-11-15T19:49:04.531Z',
                updatedAt: '2023-11-15T19:49:04.531Z',
              },
            ],
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
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.BAD_REQUEST,
          error: 'Bad Request',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
