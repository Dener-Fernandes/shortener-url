import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UrlPayloadDto } from '../dtos/url-payload.dto';
import { UrlDto } from '../dtos/url.dto';
import {
  THIS_URL_IS_ALREADY_TAKEN_BY_ANOTHER_USER,
  URL_NOT_FOUND_OR_ALREADY_DELETED,
} from 'src/common/utils/constants';

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
              THIS_URL_IS_ALREADY_TAKEN_BY_ANOTHER_USER,
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
