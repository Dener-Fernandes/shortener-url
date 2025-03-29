import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { UserDto } from '../auth/dtos/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from 'express';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Post('shorten')
  async shortenUrl(@Body('url') url: string, @AuthUser() user: UserDto) {
    return await this.urlService.create(url, user);
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
  @HttpCode(204)
  async delete(@Param('id') id: string, @AuthUser() user: UserDto) {
    await this.urlService.delete(id, user);
  }

  @Get(':shortUrl')
  async redirectToOriginalUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ) {
    const originalUrl =
      await this.urlService.getOriginalUrlAndIncrementAccessCount(shortUrl);

    return res.redirect(302, originalUrl);
  }
}
