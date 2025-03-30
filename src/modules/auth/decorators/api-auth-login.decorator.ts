import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthLoginDto } from '../dtos/auth-login.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function ApiAuthLogin() {
  return applyDecorators(
    ApiBody({
      type: AuthLoginDto,
      description: 'Payload to be sent',
    }),
    ApiOperation({
      operationId: 'apiAuth',
      description: 'It authenticates user',
    }),
    ApiResponse({
      status: 201,
      description: 'Created',
      type: AuthResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      content: {
        'application/json': {
          example: {
            message: [
              'email must be a string',
              'email must be an email',
              'password must be a string',
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
