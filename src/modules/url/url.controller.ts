import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { UserDto } from '../auth/dtos/user.dto';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Post('shorten')
  async shortenUrl(@Body('url') url: string, @AuthUser() user: UserDto) {
    return await this.urlService.shortenUrl(url, user);
  }
}
