// import { Types } from 'mongoose';
import { IsEnum, IsMongoId, IsString, MinLength } from 'class-validator';
import { COUNTRY } from '../../models/city.model';
// import { IsObjectId } from '../../utils/obj-id.decorator';

export class AddCityDTO {
    @IsString()
    @MinLength(2, {
        message: 'CityName is too short',
    })
    cityName: string;

    @IsString()
    @IsEnum(COUNTRY)
    country: COUNTRY;
}

export class GetCityDTO {
    // @IsObjectId()
    // _id: Types.ObjectId;

    @IsMongoId()
    _id: string;
}
