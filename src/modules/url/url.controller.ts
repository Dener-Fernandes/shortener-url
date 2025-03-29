import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('url') url: string,
    @AuthUser() user: UserDto,
  ) {
    return await this.urlService.update(id, url, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @AuthUser() user: UserDto) {
    await this.urlService.delete(id, user);
  }
}
