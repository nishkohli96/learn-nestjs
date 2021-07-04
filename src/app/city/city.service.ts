import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CityModel } from '../../models/city.model';
import { AddCityDTO, GetCityDTO } from './city.dto';

@Injectable()
export class CityService {
    constructor(
        @InjectModel(CityModel)
        private cityModel: ReturnModelType<typeof CityModel>,
    ) {}

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
