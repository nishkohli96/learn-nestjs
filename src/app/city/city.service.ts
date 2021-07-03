import { Injectable, Inject } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CityModel, CitySchema } from '../../models/city.model';
import { AddCityDTO, GetCityDTO } from './city.dto';
import { CityDAL } from './city.dal';

@Injectable()
export class CityService {

    constructor(
        @Inject("CityDAL") private cityModel: CityDAL ,
    )
    { }

    async getCities(): Promise<CitySchema[]> {
        const res = await this.cityModel.findAll({});
        return res;
    }

    async getCity(param: GetCityDTO): Promise<CitySchema | null> {
        console.log(param);
        const res = await this.cityModel.findOne({ _id: param._id });
        console.log('res: ', CityModel);
        return res;
    }

    async addCity(body: AddCityDTO): Promise<CitySchema> {
        console.log('resp: ', this.cityModel);

        const res =  this.cityModel.create(body);
        return res;
    }
}
