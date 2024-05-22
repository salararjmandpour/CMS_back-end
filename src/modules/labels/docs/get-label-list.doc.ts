import {
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const ApiGetLabelList = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get label list',
      description: '`type` query should be `product` or `post` or `all` values',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            labels: [
              {
                labels: {
                  _id: '650e1b635cb4104ddafb57e9',
                  name: 'تجهیزات پزشکی',
                  slug: 'tajhizat-pezeshki',
                  description: 'متن تستی برای تجهیزات پزشکی',
                  createdAt: '2023-09-22T22:55:31.188Z',
                  updatedAt: '2023-09-22T23:23:38.981Z',
                },
                seo: {
                  _id: '650e1b635cb4104ddafb57eb',
                  title: ['title'],
                  slug: 'tajhizat-pezeshki',
                  description: 'متن تستی برای تجهیزات پزشکی',
                  category: '650e1b635cb4104ddafb57e9',
                  createdAt: '2023-09-22T22:55:31.205Z',
                  updatedAt: '2023-09-22T23:23:39.018Z',
                },
              },
              {
                label: {
                  _id: '650dfa8625ebf8e25d178892',
                  name: 'تجهیرات تست',
                  slug: 'test-equipment',
                  description: 'متن تستی برای تجهیزات پزشکی',
                  createdAt: '2023-09-22T20:35:18.513Z',
                  updatedAt: '2023-09-22T20:35:18.513Z',
                },
              },
            ],
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [
            ResponseMessages.FAILED_GET_LABEL_LIST,
            ResponseMessages.FAILED_GET_SEO_LIST,
          ],
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
