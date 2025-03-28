import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignUpDto } from './dtos/auth-signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authSignUpDto: AuthSignUpDto) {
    return await this.authService.signUp(authSignUpDto);
  }
}
