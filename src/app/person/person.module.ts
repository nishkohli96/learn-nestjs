import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { AuthGuard } from '../../utils/auth.guard';

@Module({
    imports: [],
    controllers: [PersonController],
    providers: [
        PersonService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class PersonModule {}
