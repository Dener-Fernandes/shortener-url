import { CommonEntity } from 'src/common/entities/common.entity';
import { UrlInterface } from './interfaces/url.interface';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Url extends CommonEntity implements UrlInterface {
  @Column({ type: 'citext', nullable: false })
  originalUrl: string;

  @Column({ type: 'text', nullable: false })
  shortUrl: string;

  @Column({ type: 'int', default: 0 })
  accessCount: number;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  @ManyToOne(() => User, (user) => user.urls, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
