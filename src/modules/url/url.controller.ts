import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { UserDto } from '../auth/dtos/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Post('shorten')
  async shortenUrl(@Body('url') url: string, @AuthUser() user: UserDto) {
    return await this.urlService.shortenUrl(url, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@AuthUser() user: UserDto) {
    return await this.urlService.findAll(user);
  }
}
