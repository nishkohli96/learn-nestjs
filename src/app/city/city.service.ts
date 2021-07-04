import { Injectable, Inject } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CityModel } from '../../models/city.model';
import { AddCityDTO, GetCityDTO } from './city.dto';

@Injectable()
export class CityService {

    constructor(
        @Inject(CityModel.name) private cityModel: ModelType<CityModel>,
    )
    { }

    async getCities(): Promise<CityModel[]> {
        const res = await this.cityModel.find({});
        return res;
    }

    async getCity(param: GetCityDTO): Promise<CityModel | null> {
        console.log(param);
        const res = await this.cityModel.findOne({ _id: param._id });
        console.log('res: ', CityModel);
        return res;
    }

    async addCity(body: AddCityDTO): Promise<CityModel> {
        console.log('resp: ', this.cityModel);

        const res = new this.cityModel(body);
        return res;
    }
}
