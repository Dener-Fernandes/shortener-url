import {
  EntitySubscriberInterface,
  Equal,
  EventSubscriber,
  FindOperator,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';
import { CryptUtil } from 'src/common/utils/crypt.util';
import { BadRequestException } from '@nestjs/common';
import { EMAIL_ADDRESS_ALREADY_EXISTS } from 'src/common/utils/constants';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    await this.checkEmailUniqueness(event);
    await this.hashInsertedPassword(event);
  }

  private async hashPassword(user: User) {
    user.salt = await CryptUtil.generateSalt();
    user.password = await CryptUtil.hashPassword(user.password, user.salt);
  }

  private async hashInsertedPassword(event: InsertEvent<User>) {
    const user = event.entity;

    await this.hashPassword(user);

    return;
  }

  private async checkEmailUniqueness(
    event: InsertEvent<User> | UpdateEvent<User>,
  ) {
    const user = event.entity;

    if (user?.email) {
      const criteria: {
        where: {
          email: FindOperator<string>;
        };
      } = {
        where: {
          email: Equal(user.email),
        },
      };

      const count = await event.manager.count(User, criteria);

      if (count > 0) {
        throw new BadRequestException(EMAIL_ADDRESS_ALREADY_EXISTS);
      } else {
        return;
      }
    } else {
      return;
    }
  }
}
