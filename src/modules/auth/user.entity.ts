import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Unique, Column } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';

@Entity()
@Unique(['userName'])
@Unique(['email'])
export class User extends CommonEntity implements UserInterface {
  @Column({ type: 'citext' })
  email: string;

  @Column({ type: 'citext', nullable: false })
  userName: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true, default: null })
  salt: string;

  @Column({ default: true, nullable: false })
  active!: boolean;
}
