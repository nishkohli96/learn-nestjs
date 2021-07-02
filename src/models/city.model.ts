import { getModelForClass, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export enum COUNTRY {
    INDIA = 'INDIA',
    USA = 'USA',
    CANADA = 'CANADA',
}

export class CitySchema {
    _id: Types.ObjectId;

    @prop({
        required: true,
        minlength: 3,
        trim: true,
    })
    cityName: string;

    @prop({
        required: true,
        enum: COUNTRY,
        default: COUNTRY.INDIA,
    })
    country: COUNTRY;
}

export const CityModel = getModelForClass(CitySchema, {
    schemaOptions: {
        collection: 'City',
        timestamps: true,
        minimize: true,
        versionKey: false,
    },
});
