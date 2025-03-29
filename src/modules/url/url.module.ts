import { forwardRef, Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Url } from './url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), forwardRef(() => AuthModule)],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
