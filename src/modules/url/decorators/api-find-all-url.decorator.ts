import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UrlDto } from '../dtos/url.dto';

export function ApiFindAllUrl() {
  return applyDecorators(
    ApiOperation({
      operationId: 'apiFindAllUrl',
      description: 'It finds all short url',
    }),
    ApiResponse({
      status: 200,
      description: 'OK',
      type: [UrlDto],
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      content: {
        'application/json': {
          example: {
            message: 'Unauthorized',
            statusCode: 401,
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
      content: {
        'application/json': {
          example: {
            message: 'Internal server error',
            statusCode: 500,
          },
        },
      },
    }),
  );
}
