import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PersonModule } from './app/person/person.module';
import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
    imports: [PersonModule],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        /* Separate multiple middlewares by , */
        consumer.apply(LoggerMiddleware).forRoutes('cats');
        /* 
      forRoutes can take the following args wrt a scenario - 
      
      1. restrict a middleware to a particular request method for a Route 
        { path: 'cats', method: RequestMethod.GET }
      
      2. Apply to a controller
        (PersonController)

        ----- To Exclude some routes ------

        consumer.exclude(
          { path: 'cats', method: RequestMethod.GET },
          { path: 'cats', method: RequestMethod.POST },
          'cats/(.*)',
        ).forRoutes('cats');
    */
    }
}
