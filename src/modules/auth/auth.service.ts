import { Injectable } from '@nestjs/common';
import { AuthSignUpDto } from './dtos/auth-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<UserDto> {
    const tempUser = this.userRepository.create(authSignUpDto);

    const dbUser = await this.userRepository.save(tempUser);

    return plainToInstance(UserDto, dbUser);
  }
}
