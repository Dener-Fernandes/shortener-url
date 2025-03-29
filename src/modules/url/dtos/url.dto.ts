import { Exclude, Expose, Type } from 'class-transformer';
import { CommonEntityDto } from 'src/common/dtos/common-entity.dto';
import { UrlInterface } from '../interfaces/url.interface';
import { UserDto } from 'src/modules/auth/dtos/user.dto';

@Exclude()
export class UrlDto extends CommonEntityDto implements UrlInterface {
  @Expose()
  originalUrl: string;

  @Expose()
  shortUrl: string;

  @Expose()
  accessCount: number;

  @Expose()
  deletedAt: Date | null;

  userId: string | null;

  @Type(() => UserDto)
  user?: UserDto;
}
