import { Module } from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import { CityModel } from '../../models/city.model';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
    imports: [TypegooseModule.forFeature([CityModel])],
    controllers: [CityController],
    providers: [CityService],
})
export class CityModule {}
