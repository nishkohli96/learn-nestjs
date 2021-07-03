import { getModelForClass, prop, Ref} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { CitySchema } from './city.model';

export class PersonSchema {
    _id: Types.ObjectId;

    @prop({
        required: true,
        minlength: 3,
        trim: true,
    })
    fullName: string;

    @prop({
        required: true,
        min: 1,
    })
    age: number;

    @prop({
        required: true,
        type: Types.ObjectId,
    })
    city: Ref<CitySchema>;

    @prop({
        required: true,
        unique: true,
    })
    email: string;

    @prop({ required: true })
    password: string;
}

export const PersonModel = getModelForClass(PersonSchema, {
    schemaOptions: {
        collection: 'Person',
        timestamps: true,
        minimize: true,
        versionKey: false,
    },
});
