import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as mongoose from 'mongoose';
import { AppModule } from './app.module';
import { LoginInterceptor } from './utils/login.interceptor';
import { AuthMiddleware } from './utils/auth.middleware';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: {
                level: 'info',
                prettyPrint: { colorize: true, levelFirst: true }, // requires pino-pretty pkg
            },
            ignoreTrailingSlash: true,
            caseSensitive: false,
            trustProxy: true,
            disableRequestLogging: true,
        }),
        {
            logger: false /* Disable NestJS Logger */,
        },
    );

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: false,
            forbidNonWhitelisted: true,
        }),
    )
        .useGlobalInterceptors(new LoginInterceptor())
        .use(new AuthMiddleware());

    try {
        await mongoose.connect(process.env.MONGO_URL ?? '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('[MONGODB]::Connected');
    } catch (e) {
        console.log('db conn err: ', e);
        process.exit(1);
    }
    /* 
        - For a global middleware throughout the app 
            app.use(MiddlewareName);

        - For a global pipe
            app.useGlobalPipes(new ValidationPipe());

        - For global guards
            app.useGlobalGuards(new RolesGuard());

        - For a global prefix
            app.setGlobalPrefix('/api);

        - For a global interceptor
            app.useGlobalInterceptors(new LoggingInterceptor());
    */
    await app.listen(3000);
}

bootstrap().catch((err) => {
    throw err;
});
