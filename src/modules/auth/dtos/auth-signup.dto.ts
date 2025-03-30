import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@Exclude()
export class AuthSignUpDto {
  @ApiProperty({
    type: 'string',
    example: 'dener-oliveira',
  })
  @Expose()
  @IsString()
  userName: string;

  @ApiProperty({
    type: 'string',
    example: 'dener.oliveira@gmail.com',
  })
  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', example: '12345678' })
  @Expose()
  @IsString()
  password: string;
}
