import { Injectable } from '@nestjs/common';
import { CityModel, CitySchema } from '../../models/city.model';
import { AddCityDTO, GetCityDTO } from './city.dto';

@Injectable()
export class CityService {

    async getCities(): Promise<CitySchema[]> {
        const res = await CityModel.find({});
        return res;
    }

    async getCity(param: GetCityDTO): Promise<CitySchema> {
        const res = await CityModel.findOne(param);
        return res;
    }

    async addCity(body: AddCityDTO): Promise<CitySchema> {
        const res = CityModel.create(body);
        return res;
    }
}
