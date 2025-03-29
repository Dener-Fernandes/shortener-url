import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Unique, Column, OneToMany } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import { Url } from '../url/url.entity';

@Entity()
@Unique(['email'])
export class User extends CommonEntity implements UserInterface {
  @Column({ type: 'citext', nullable: false })
  email: string;

  @Column({ type: 'citext', nullable: false })
  userName: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true, default: null })
  salt: string;

  @Column({ default: true, nullable: false })
  active: boolean;

  @OneToMany(() => Url, (url) => url.user, { cascade: true })
  urls: Url[];
}
