import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthSignUpDto } from './dtos/auth-signup.dto';
import { AuthService } from './auth.service';
import { AuthUser } from './decorators/auth-user.decorator';
import { UserDto } from './dtos/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiAuthSignUp } from './decorators/api-auth-signup.decorator';
import { ApiAuthSignIn } from './decorators/api-auth-signin.decorator';
import { ValidateSignInGuard } from './guards/validate-signin.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiAuthSignUp()
  @Post('signup')
  async signUp(@Body() authSignUpDto: AuthSignUpDto) {
    return await this.authService.signUp(authSignUpDto);
  }

  @ApiAuthSignIn()
  @UseGuards(ValidateSignInGuard, LocalAuthGuard)
  @Post('signin')
  async signIn(@AuthUser() user: UserDto) {
    return await this.authService.jwtSign(user);
  }
}
