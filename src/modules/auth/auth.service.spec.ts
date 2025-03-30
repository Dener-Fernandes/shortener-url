import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { UserInterface } from './interfaces/user.interface';
import { AuthSignUpDto } from './dtos/auth-signup.dto';

const mockJwtConfig: ConfigType<typeof jwtConfig> = {
  secret: 'test-global-secret',
  access: {
    secret: 'test-access-secret',
    signOptions: { expiresIn: '1h' },
  },
  refresh: {
    secret: 'test-refresh-secret',
    signOptions: { expiresIn: '7d' },
  },
};

class JwtServiceMock {
  sign(payload: any, options?: any) {
    return 'mock-jwt-token';
  }
  verify(token: string) {
    return { userId: 'test-id' };
  }
}

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userRepository: Repository<User>;

  const mockUser: UserInterface = {
    id: 'test-id',
    email: 'test@example.com',
    password: '12345678',
    userName: 'test-user',
    salt: '$2b$10$USxbAQf6Rbo79wAyTjAn3O',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: () => ({
            secret: 'test-secret',
            signOptions: { expiresIn: '1h' },
          }),
        }),
      ],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useClass: JwtServiceMock,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockReturnValue(mockUser),
            save: jest.fn().mockResolvedValue(mockUser),
            findOneBy: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: jwtConfig.KEY,
          useValue: mockJwtConfig,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('signUp', () => {
    it('should successfully sign up a user', async () => {
      const authSignUpDto: AuthSignUpDto = {
        userName: 'test-user',
        email: 'test@example.com',
        password: '12345678',
      };

      const result = await authService.signUp(authSignUpDto);

      expect(result).toBeDefined();
      expect(result.accessToken).toBeDefined();
    });
  });

  describe('jwtSign', () => {
    it('should generate a valid JWT token', async () => {
      const userDto = { ...mockUser, id: 'test-id' };

      const result = await authService.jwtSign(userDto);

      expect(result).toBeDefined();
      expect(result.accessToken).toBeDefined();
    });
  });

  describe('validateUser', () => {
    it('should return the user if email and password are valid', async () => {
      const email = 'test@example.com';
      const password = '12345678';

      jest
        .spyOn(authService, 'validateUserPassword')
        .mockResolvedValue(mockUser);

      const result = await authService.validateUser(email, password);

      expect(result).toBeDefined();
      expect(result!.email).toBe(email);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      const email = 'nonexistent@example.com';
      const password = '12345678';

      const result = await authService.validateUser(email, password);

      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should return the user if found', async () => {
      const result = await authService.findById('test-id');

      expect(result).toBeDefined();
      expect(result.id).toBe('test-id');
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(authService.findById('nonexistent-id')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
