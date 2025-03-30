import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  INVALID_UUID_PARAMETER,
  URL_NOT_FOUND_OR_ALREADY_DELETED,
} from 'src/common/utils/constants';

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
      status: 400,
      description: 'Bad Request',
      content: {
        'application/json': {
          example: {
            message: [INVALID_UUID_PARAMETER],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      },
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
            message: URL_NOT_FOUND_OR_ALREADY_DELETED,
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
