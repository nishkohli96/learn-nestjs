import { Module } from '@nestjs/common';
import { CityModel } from '../../models/city.model';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
    imports: [],
    controllers: [CityController],
    providers: [CityService,
        {
            useClass: CityModel,
            provide: CityModel.name
        },
    ],
})
export class CityModule {}
