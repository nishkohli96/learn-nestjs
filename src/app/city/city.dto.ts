import { IsEnum, IsString, MinLength } from "class-validator";
import { COUNTRY } from '../../models/city.model';

export class AddCityDTO {
    @IsString()
    @MinLength(2)
    cityName: string;

    @IsString()
    @IsEnum(COUNTRY)
    country: COUNTRY
}