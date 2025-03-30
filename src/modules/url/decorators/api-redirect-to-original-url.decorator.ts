import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiRedirectToOriginalUrl() {
  return applyDecorators(
    ApiOperation({
      operationId: 'ApiRedirectToOriginalUrl',
      description: 'It redirect to an original url',
    }),
    ApiResponse({
      status: 200,
      description: 'Redirects to the original URL',
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
