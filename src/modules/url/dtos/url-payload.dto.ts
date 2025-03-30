import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UrlPayloadDto {
  @ApiProperty({
    type: 'string',
    example:
      'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
  })
  @IsString()
  url: string;
}
