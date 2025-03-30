import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { Url } from './url.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../auth/dtos/user.dto';
import { plainToInstance } from 'class-transformer';
import { UrlDto } from './dtos/url.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}

  async create(url: string, user?: UserDto): Promise<UrlDto> {
    const shortUrl = this.shortenUrl(url);

    const tempUrl = this.urlRepository.create({
      originalUrl: url,
      shortUrl: shortUrl,
      userId: user?.id || null,
    });

    const dbUrl = await this.urlRepository.save(tempUrl);

    return plainToInstance(UrlDto, dbUrl);
  }

  async findAll(user: UserDto): Promise<UrlDto[]> {
    let urls = await this.urlRepository.find({ where: { userId: user.id } });

    if (urls.length > 0)
      urls = urls.filter((url: Url) => url.deletedAt === null);

    return plainToInstance(UrlDto, urls);
  }

  async update(id: string, url: string, user: UserDto): Promise<UrlDto> {
    const dbUrl = await this.findById(id, user);

    const shortUrl = this.shortenUrl(url);

    dbUrl.originalUrl = url;
    dbUrl.shortUrl = shortUrl;
    dbUrl.updatedAt = new Date();

    await this.urlRepository.update(id, dbUrl);

    return plainToInstance(UrlDto, dbUrl);
  }

  async delete(id: string, user: UserDto): Promise<void> {
    const url = await this.findById(id, user);

    url.deletedAt = new Date();

    await this.urlRepository.update(id, url);
  }

  async getOriginalUrlAndIncrementAccessCount(
    shortUrl: string,
  ): Promise<string> {
    shortUrl = `http://localhost/${shortUrl}`;

    const url = await this.urlRepository.findOne({
      where: { shortUrl, deletedAt: IsNull() },
    });

    if (!url) throw new NotFoundException('url not found or already deleted');

    url.accessCount += 1;
    await this.urlRepository.save(url);

    return url.originalUrl;
  }

  private async findById(id: string, user: UserDto): Promise<Url> {
    const url = await this.urlRepository.findOne({
      where: { id, userId: user.id, deletedAt: IsNull() },
    });

    if (!url) {
      throw new NotFoundException('url not found or already deleted');
    }

    return url;
  }

  private shortenUrl(url: string): string {
    let hash = crypto.createHash('md5').update(url).digest('base64url');

    hash = hash.substring(0, 6);

    return `http://localhost/${hash}`;
  }
}
