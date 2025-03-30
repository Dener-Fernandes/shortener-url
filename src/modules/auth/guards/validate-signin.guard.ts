import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { AuthSignInDto } from '../dtos/auth-signin.dto';

@Injectable()
export class ValidateSignInGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const body = request.body ?? {};

    const authLoginDto = plainToInstance(AuthSignInDto, body);
    const errors = await validate(authLoginDto);

    if (errors.length > 0) {
      const messages = this.extractErrorMessages(errors);
      throw new BadRequestException({
        message: messages,
        error: 'Bad Request',
        statusCode: 400,
      });
    }

    return true;
  }

  private extractErrorMessages(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints || {}));
  }
}
