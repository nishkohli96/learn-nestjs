import { Injectable, Inject } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CityModel, CitySchema } from '../../models/city.model';
import { AddCityDTO, GetCityDTO } from './city.dto';

@Injectable()
export class CityService {

    constructor(
        @Inject(CityModel.name) private cityModel: ModelType<CitySchema>,
    )
    { }

    async getCities(): Promise<CitySchema[]> {
        const res = await this.cityModel.find({});
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

        const res = new this.cityModel(body);
        return res;
    }
}
