
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthMiddleware } from './middlewares/AuthMiddlware';
import { ContextMiddleware } from './middlewares/ContextMiddleware';
import { BlogModule } from './modules/BlogModule';
import { RolesGuardService } from './services/RolesGuardService';

const providers = [
  RolesGuardService,
];
@Module({
  imports: [
    BlogModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 200000,
    }),
  ],
  providers: [
    ...providers,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
  ],
  exports: providers
})
export class HttpModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
      )
      .forRoutes("*");

    consumer
      .apply(ContextMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
      )
      .forRoutes("*");
  }
}