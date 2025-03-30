import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Url } from './url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UUIDValidatorMiddleware } from './middlewares/uuid-validator.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), forwardRef(() => AuthModule)],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UUIDValidatorMiddleware)
      .forRoutes(
        { path: 'url/:id', method: RequestMethod.PATCH },
        { path: 'url/:id', method: RequestMethod.DELETE },
      );
  }
}
