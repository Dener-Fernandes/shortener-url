import { Exclude, Expose, Type } from 'class-transformer';
import { CommonEntityDto } from 'src/common/dtos/common-entity.dto';
import { UrlInterface } from '../interfaces/url.interface';
import { UserDto } from 'src/modules/auth/dtos/user.dto';

@Exclude()
export class UrlDto extends CommonEntityDto implements UrlInterface {
  @Exclude()
  declare id: string;

  @Exclude()
  declare createdAt: Date;

  @Exclude()
  declare updatedAt: Date;

  @Expose()
  originalUrl: string;

  @Expose()
  shortUrl: string;

  accessCount: number;

  deletedAt: Date | null;

  userId: string | null;

  @Type(() => UserDto)
  user?: UserDto;
}
