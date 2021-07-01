import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonModule } from './app/person/person.module';
import { CityModule } from './app/city/city.module';
// import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
    imports: [
        PersonModule,
        CityModule,
        ConfigModule.forRoot({
            cache: true,
            /* Can use this for  .env files, instead of env-cmd across diff instances,
              no need to write 2 scripts like that in cmd 'start-prod  in pkg.json */
            envFilePath: process.env.NODE_ENV === 'dev' ? '.env' : '.env.prod',
            /* Disable env file loading */
            // ignoreEnvFile: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure() {
        // configure(consumer: MiddlewareConsumer) {
        /* Separate multiple middlewares by , */
        // consumer.apply(LoggerMiddleware).forRoutes('cats');
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

/* For more config - https://docs.nestjs.com/techniques/configuration */
