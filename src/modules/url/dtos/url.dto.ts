import { Exclude, Expose, Type } from 'class-transformer';
import { CommonEntityDto } from 'src/common/dtos/common-entity.dto';
import { UrlInterface } from '../interfaces/url.interface';
import { UserDto } from 'src/modules/auth/dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UrlDto extends CommonEntityDto implements UrlInterface {
  @ApiProperty({
    type: 'string',
    example:
      'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
  })
  @Expose()
  originalUrl: string;

  @ApiProperty({
    type: 'string',
    example: 'http://localhost/J7G08e',
  })
  @Expose()
  shortUrl: string;

  @ApiProperty({
    type: 'number',
    example: '0',
  })
  @Expose()
  accessCount: number;

  @ApiProperty({
    type: 'null',
    example: 'null',
  })
  @Expose()
  deletedAt: Date | null;

  userId: string | null;

  @Type(() => UserDto)
  user?: UserDto;
}
