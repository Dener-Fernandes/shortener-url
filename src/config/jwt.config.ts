import { registerAs } from '@nestjs/config';
import { JwtConfigInterface } from 'src/common/interfaces/jwt-config.interface';

export const jwtConfig = registerAs(
  'JWT_MODULE_CONFIG',
  (): JwtConfigInterface => ({
    secret:
      process.env.JWT_SECRET ||
      'Do you know the terror of he who falls asleep?',
    access: {
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXPIRES || '1h',
      },
    },
    refresh: {
      signOptions: {
        expiresIn: process.env.JWT_REFRESH_EXPIRES || '1h',
      },
    },
  }),
);
