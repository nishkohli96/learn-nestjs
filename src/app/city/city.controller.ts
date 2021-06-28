import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { AddCityDTO, GetCityDTO } from './city.dto';
import { CitySchema } from '../../models/city.model';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Get()
    getCities(): Promise<CitySchema[]> {
        return this.cityService.getCities();
    }

    @Get(":/id")
    getCity(@Param() param: GetCityDTO): Promise<CitySchema> {
        return this.cityService.getCity(param);
    }

    @Post()
    addCity(@Body() body: AddCityDTO): Promise<CitySchema> {
        return this.cityService.addCity(body);
    }
}
