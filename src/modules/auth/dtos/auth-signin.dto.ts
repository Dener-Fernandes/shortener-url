import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthSignInDto {
  @ApiProperty({
    type: 'string',
    example: 'dener.oliveira@gmail.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    type: 'string',
    example: '12345678',
  })
  @IsString()
  password: string;
}
