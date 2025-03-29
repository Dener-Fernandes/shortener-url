import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async shortenUrl(url: string, user?: UserDto): Promise<UrlDto> {
    let hash = crypto.createHash('md5').update(url).digest('base64url');

    hash = hash.substring(0, 6);

    const shortUrl = `http://localhost/${hash}`;
    const isShortUrlFound = await this.findShortUrl(shortUrl);

    if (isShortUrlFound)
      throw new BadRequestException('cannot shorten this url');

    const tempUrl = this.urlRepository.create({
      originalUrl: url,
      shortUrl: shortUrl,
      userId: user?.id || null,
    });

    const dbUrl = await this.urlRepository.save(tempUrl);

    return plainToInstance(UrlDto, dbUrl);
  }

  async findShortUrl(shortUrl: string): Promise<Url | null> {
    const isShortUrlFound = await this.urlRepository.findOneBy({
      shortUrl,
      deletedAt: undefined,
    });

    if (!isShortUrlFound) return null;

    return isShortUrlFound;
  }

  async findAll(user: UserDto): Promise<Url[]> {
    let urls = await this.urlRepository.find({ where: { userId: user.id } });

    if (urls.length > 0)
      urls = urls.filter((url: Url) => url.deletedAt === null);

    return urls;
  }

  async delete(id: string, user: UserDto): Promise<void> {
    const url = await this.findById(id, user);

    url.deletedAt = new Date();

    await this.urlRepository.save(url);
  }

  private async findById(id: string, user: UserDto): Promise<Url> {
    const url = await this.urlRepository.findOne({
      where: { id, userId: user.id, deletedAt: undefined },
    });

    if (!url) {
      throw new NotFoundException('url not found or already deleted');
    }

    return url;
  }
}
