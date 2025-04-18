import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthSignInDto } from '../dtos/auth-signin.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function ApiAuthSignIn() {
  return applyDecorators(
    ApiBody({
      type: AuthSignInDto,
      description: 'Payload to be sent',
    }),
    ApiOperation({
      operationId: 'apiAuthSignIn',
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
