import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { CitySchema } from './city.model';

export class PersonSchema {
    _id: Types.ObjectId;

    @prop({
        required: true,
        minlength: 3,
    })
    fullName: string;

    @prop({
        required: true,
        min: 1,
    })
    age: number;

    @prop({
        required: true,
    })
    city: Ref<CitySchema>;
}

export const PersonModel = getModelForClass(PersonSchema, {
    schemaOptions: {
        collection: 'Person',
        timestamps: true,
        minimize: true,
    },
});
