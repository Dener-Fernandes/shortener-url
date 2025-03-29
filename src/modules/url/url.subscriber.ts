import {
  EntitySubscriberInterface,
  Equal,
  EventSubscriber,
  InsertEvent,
  IsNull,
  Not,
  UpdateEvent,
} from 'typeorm';
import { Url } from './url.entity';
import { BadRequestException } from '@nestjs/common';

@EventSubscriber()
export class UrlSubscriber implements EntitySubscriberInterface<Url> {
  listenTo() {
    return Url;
  }

  async beforeInsert(event: InsertEvent<Url>) {
    await this.checkShortUrlUniqueness(event);
  }
  async beforeUpdate(event: UpdateEvent<Url>) {
    await this.checkShortUrlUniqueness(event);
  }

  private async checkShortUrlUniqueness(
    event: InsertEvent<Url> | UpdateEvent<Url>,
  ) {
    const url = event.entity;

    if (!url?.originalUrl) {
      return;
    }

    const isInsert = !url.id;
    const isUpdate = !!url.id;

    if (isInsert) {
      const existingUrl = await event.manager.findOne(Url, {
        where: {
          shortUrl: Equal(url.shortUrl),
          deletedAt: IsNull(),
        },
      });

      if (existingUrl) {
        throw new BadRequestException('this url has already been shortened');
      }
    }

    if (isUpdate) {
      const duplicateUrl = await event.manager.findOne(Url, {
        where: {
          shortUrl: Equal(url.shortUrl),
          userId: Not(url.userId),
          deletedAt: IsNull(),
        },
      });

      if (duplicateUrl) {
        throw new BadRequestException(
          'this url is already taken by another user',
        );
      }
    }
  }
}
