import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { typeormConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeormConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeormConfig.KEY],
      useFactory: async (config: ConfigType<typeof typeormConfig>) => config,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
