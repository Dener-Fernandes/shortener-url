import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UrlPayloadDto } from '../dtos/url-payload.dto';
import { UrlDto } from '../dtos/url.dto';

export function ApiUpdateUrlPayload() {
  return applyDecorators(
    ApiBody({
      type: UrlPayloadDto,
      description: 'Payload to be sent',
    }),
    ApiOperation({
      operationId: 'apiUpdatesUrlPayload',
      description: 'It updates a short url',
    }),
    ApiResponse({
      status: 200,
      description: 'OK',
      type: UrlDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      content: {
        'application/json': {
          example: {
            message: [
              'url must be a string',
              'this url is already taken by another user',
            ],
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
