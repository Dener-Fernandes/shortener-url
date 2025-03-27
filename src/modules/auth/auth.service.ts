import { Injectable } from '@nestjs/common';
import { AuthSignUpDto } from './dtos/auth-signup.dto';

@Injectable()
export class AuthService {
  async signUp(authSignUpDto: AuthSignUpDto) {
    // TODO
  }
}
