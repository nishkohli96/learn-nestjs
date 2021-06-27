import {
    Controller,
    Get,
    Post,
    Param,
} from '@nestjs/common';
import { CityService } from './city.service';
import { AddCityDTO } from './city.dto';
import { CitySchema} from '../../models/city.model';

@Controller("city")
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Get()
    getCities(): Promise<CitySchema[]> {
        return this.cityService.getCities();
    }

    @Post()
    addCity(body: AddCityDTO): Promise<CitySchema> {
        return this.cityService.addCity(body);
    }
}