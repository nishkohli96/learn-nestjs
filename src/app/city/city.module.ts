import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityDAL } from './city.dal';

@Module({
    imports: [],
    controllers: [CityController],
    providers: [CityService,
        {
            useClass: CityDAL,
            provide: CityDAL.name
        },
    ],
})
export class CityModule {}
