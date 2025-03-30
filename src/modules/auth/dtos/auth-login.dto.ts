import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    type: 'string',
    example: 'dener.oliveira@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: '12345678',
  })
  @IsString()
  password: string;
}
