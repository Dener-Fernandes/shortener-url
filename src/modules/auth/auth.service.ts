import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthSignUpDto } from './dtos/auth-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';
import { plainToInstance } from 'class-transformer';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(jwtConfig.KEY) private config: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<AuthResponseDto> {
    const tempUser = this.userRepository.create(authSignUpDto);

    const dbUser = await this.userRepository.save(tempUser);

    const user = plainToInstance(UserDto, dbUser);

    return await this.jwtSign(user);
  }

  async jwtSign(user: UserDto): Promise<AuthResponseDto> {
    const accessConfig = this.config.access;

    const payload: JwtPayload = { sub: user.id };

    const accessToken = this.jwtService.sign(
      payload,
      accessConfig?.signOptions,
    );

    return new AuthResponseDto(accessToken);
  }
}
