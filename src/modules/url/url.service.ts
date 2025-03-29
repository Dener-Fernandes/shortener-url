import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Url } from './url.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../auth/dtos/user.dto';
import { plainToInstance } from 'class-transformer';
import { UrlDto } from './dtos/url.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}

  async shortenUrl(url: string, user?: UserDto) {
    let hash = crypto.createHash('md5').update(url).digest('base64url');

    hash = hash.substring(0, 6);

    const shortUrl = `http://localhost/${hash}`;
    console.log(shortUrl);
    const tempUrl = this.urlRepository.create({
      originalUrl: url,
      shortUrl: shortUrl,
      userId: user?.id || null,
    });

    const dbUrl = await this.urlRepository.save(tempUrl);

    return plainToInstance(UrlDto, dbUrl);
  }
}
