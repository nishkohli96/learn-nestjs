import { CitySchema, CityModel } from '../../models/city.model';
import { BaseDAL } from '../../models/base.dal';

export class CityDAL extends BaseDAL<CitySchema> {
    constructor() {
        super(CityModel);
    }
}