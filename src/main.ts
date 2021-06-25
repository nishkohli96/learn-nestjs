import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: {
                level: 'info',
                prettyPrint: true, // requires pino-pretty pkg
            },
            ignoreTrailingSlash: true,
            caseSensitive: false,
        }),
    );

    /* 
        For a global middleware throughout the app 
        - app.use(MiddlewareName);

        For a global pipe
        - app.useGlobalPipes(new ValidationPipe());

        For global guards
        - app.useGlobalGuards(new RolesGuard());

        For a global prefix
        - app.setGlobalPrefix('/api);
    */
    await app.listen(3000);
}

bootstrap();
