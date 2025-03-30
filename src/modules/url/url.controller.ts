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
import { UrlPayloadDto } from './dtos/url-payload.dto';
import { ApiCreateUrlPayload } from './decorators/api-create-url-payload.decorator';
import { ApiUpdateUrlPayload } from './decorators/api-update-url-payload.decorator';
import { ApiFindAllUrl } from './decorators/api-find-all-url.decorator';
import { ApiDeleteUrl } from './decorators/api-delete-url.decorator';
import { ApiRedirectToOriginalUrl } from './decorators/api-redirect-to-original-url.decorator';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @ApiBearerAuth()
  @ApiSecurity('optional-jwt')
  @ApiCreateUrlPayload()
  @UseGuards(OptionalJwtAuthGuard)
  @Post('shorten')
  async shortenUrl(@Body() { url }: UrlPayloadDto, @AuthUser() user: UserDto) {
    return await this.urlService.create(url, user);
  }

  @ApiBearerAuth()
  @ApiFindAllUrl()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@AuthUser() user: UserDto) {
    return await this.urlService.findAll(user);
  }

  @ApiBearerAuth()
  @ApiUpdateUrlPayload()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('url') url: string,
    @AuthUser() user: UserDto,
  ) {
    return await this.urlService.update(id, url, user);
  }

  @ApiBearerAuth()
  @ApiDeleteUrl()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string, @AuthUser() user: UserDto) {
    await this.urlService.delete(id, user);
  }

  @ApiRedirectToOriginalUrl()
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
