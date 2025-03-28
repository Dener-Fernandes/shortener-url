import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('optional-jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    if (err) {
      throw err;
    }

    return user || null;
  }
}
