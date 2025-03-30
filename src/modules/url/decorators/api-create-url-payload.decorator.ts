import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UrlPayloadDto } from '../dtos/url-payload.dto';
import { UrlDto } from '../dtos/url.dto';

export function ApiCreateUrlPayload() {
  return applyDecorators(
    ApiBody({
      type: UrlPayloadDto,
      description: 'Payload to be sent',
    }),
    ApiOperation({
      operationId: 'apiCreateUrlPayload',
      description: 'It creates a short url',
    }),
    ApiResponse({
      status: 201,
      description: 'Created',
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
              'this url has already been shortened',
            ],
            error: 'Bad Request',
            statusCode: 400,
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
