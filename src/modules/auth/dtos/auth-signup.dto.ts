import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@Exclude()
export class AuthSignUpDto {
  @Expose()
  @IsString()
  userName: string;

  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  password: string;
}
