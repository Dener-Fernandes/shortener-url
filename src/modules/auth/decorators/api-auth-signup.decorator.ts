import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { AuthSignUpDto } from '../dtos/auth-signup.dto';
import { EMAIL_ADDRESS_ALREADY_EXISTS } from 'src/common/utils/constants';

export function ApiAuthSignUp() {
  return applyDecorators(
    ApiBody({
      type: AuthSignUpDto,
      description: 'Payload to be sent',
    }),
    ApiOperation({
      operationId: 'apiAuth',
      description: 'It creates an user',
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
              'userName must be a string',
              'email must be an email',
              'email must be a string',
              'password must be a string',
              EMAIL_ADDRESS_ALREADY_EXISTS,
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
