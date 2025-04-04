import { Exclude, Expose, Type } from 'class-transformer';
import { CommonEntityDto } from 'src/common/dtos/common-entity.dto';
import { UserInterface } from '../interfaces/user.interface';
import { UrlDto } from 'src/modules/url/dtos/url.dto';

@Exclude()
export class UserDto
  extends CommonEntityDto
  implements Omit<UserInterface, 'salt' | 'password'>
{
  @Expose()
  email: string;

  @Expose()
  userName: string;

  @Expose()
  @Type(() => Boolean)
  active: boolean;

  @Expose()
  @Type(() => UrlDto)
  urls?: UrlDto[];
}
