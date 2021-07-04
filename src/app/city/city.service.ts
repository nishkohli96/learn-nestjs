import { Injectable , Inject} from '@nestjs/common';
import { CityModel } from '../../models/city.model';
import { AddCityDTO, GetCityDTO } from './city.dto';
import { CityDAL } from './city.dal';

@Injectable()
export class CityService {
    constructor(
        @Inject("CityDAL") private cityDAL: CityDAL ,
    )
    { }

    async getCities(): Promise<CityModel[]> {
        const res = await this.cityDAL.findAll({});
        return res;
    }

    async getCity(param: GetCityDTO): Promise<CityModel | null> {
        const res = await this.cityDAL.findOne({ _id: param._id });
        return res;
    }

    async addCity(body: AddCityDTO): Promise<CityModel> {
        const res =  this.cityDAL.create(body);
        return res;
    }
}
