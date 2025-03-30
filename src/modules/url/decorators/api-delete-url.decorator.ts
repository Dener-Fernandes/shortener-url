import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiDeleteUrl() {
  return applyDecorators(
    ApiOperation({
      operationId: 'apiDeleteUrl',
      description: 'It deletes all short url',
    }),
    ApiResponse({
      status: 204,
      description: 'No Content',
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
      status: 404,
      description: 'Not Found',
      content: {
        'application/json': {
          example: {
            message: 'url not found or already deleted',
            error: 'Not Found',
            statusCode: 404,
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
