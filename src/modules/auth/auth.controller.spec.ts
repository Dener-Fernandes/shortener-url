import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSignUpnterface } from './interfaces/auth-signup.interface';
import { AuthResponseInterface } from './interfaces/auth-response.interface';
import { UserInterface } from './interfaces/user.interface';
import { validate } from 'class-validator';
import { AuthSignUpDto } from './dtos/auth-signup.dto';
import { AuthLoginDto } from './dtos/auth-login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            jwtSign: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('should be able to return a jwt token after after signuped successfully', async () => {
    const mockSignUpDto: AuthSignUpnterface = {
      userName: 'test-test',
      email: 'test@example.com',
      password: '123456',
    };
    const mockResult: AuthResponseInterface = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Mjc3NjM3YS00MmUzLTQyNGQtYmYzZS0xYTg5Njk4MGM3MDMiLCJpYXQiOjE3NDMyNzgyMDMsImV4cCI6MTc0MzI4MTgwM30.n6H5kSmGJmAxUxeySuhkjdfeWIpjXBgFZ-BFgEWvTuc',
    };

    jest.spyOn(authService, 'signUp').mockResolvedValue(mockResult);

    const result = await authController.signUp(mockSignUpDto);

    expect(result).toEqual(mockResult);
    expect(authService.signUp).toHaveBeenCalledWith(mockSignUpDto);
  });

  it('should be able to return a jwt token after after after signed in successfully', async () => {
    const mockSignInDto: UserInterface = {
      id: 'ac3a0363-275e-40e6-a3b1-e4783380e89f',
      createdAt: new Date('2025-03-07T04:06:00.558Z'),
      updatedAt: new Date('2025-03-07T04:06:00.558Z'),
      userName: 'teste-teste',
      email: 'test@example.com',
      password: '123456',
      active: true,
    };
    const mockResult: AuthResponseInterface = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Mjc3NjM3YS00MmUzLTQyNGQtYmYzZS0xYTg5Njk4MGM3MDMiLCJpYXQiOjE3NDMyNzgyMDMsImV4cCI6MTc0MzI4MTgwM30.n6H5kSmGJmAxUxeySuhkjdfeWIpjXBgFZ-BFgEWvTuc',
    };

    jest.spyOn(authService, 'jwtSign').mockResolvedValue(mockResult);

    const result = await authController.signIn(mockSignInDto);

    expect(result).toEqual(mockResult);
    expect(authService.jwtSign).toHaveBeenCalledWith(mockSignInDto);
  });
});

describe('AuthSignUpDto', () => {
  it('should return an error if userName is not a string', async () => {
    const dto = new AuthSignUpDto();
    dto.userName = 123 as any;
    dto.email = 'test.test@gmail.com';
    dto.password = '12345678';

    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('userName');
    expect(errors[0].constraints?.isString).toBe('userName must be a string');
  });

  it('should return an error if email is not a valid email', async () => {
    const dto = new AuthSignUpDto();
    dto.userName = 'test-test';
    dto.email = 'invalid-email';
    dto.password = '12345678';

    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('email');
    expect(errors[0].constraints?.isEmail).toBe('email must be an email');
  });

  it('should return an error if password is not a string', async () => {
    const dto = new AuthSignUpDto();
    dto.userName = 'test-test';
    dto.email = 'test.test@gmail.com';
    dto.password = 12345 as any;

    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('password');
    expect(errors[0].constraints?.isString).toBe('password must be a string');
  });
});

describe('AuthLoginDto', () => {
  it('should return an error if the email is invalid', async () => {
    const dto = new AuthLoginDto();
    dto.email = 'invalid-email';
    dto.password = '12345678';

    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('email');
    expect(errors[0].constraints?.isEmail).toBe('email must be an email');
  });

  it('should return an error if the password is not a string', async () => {
    const dto = new AuthLoginDto();
    dto.email = 'dener.oliveira@gmail.com';
    dto.password = 12345678 as any; // Forcing error

    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('password');
    expect(errors[0].constraints?.isString).toBe('password must be a string');
  });

  it('should return an error if the email is empty', async () => {
    const dto = new AuthLoginDto();
    dto.email = ''; // Empty email
    dto.password = '12345678';

    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('email');
    expect(errors[0].constraints?.isEmail).toBe('email must be an email');
  });

  it('should return an error if the password is empty', async () => {
    const dto = new AuthLoginDto();
    dto.email = 'dener.oliveira@gmail.com';
    dto.password = undefined as any; // Empty password

    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('password');
    expect(errors[0].constraints?.isString).toBe('password must be a string');
  });
});
