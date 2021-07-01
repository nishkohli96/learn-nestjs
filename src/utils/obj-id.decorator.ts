import { Types } from 'mongoose';
import { registerDecorator, ValidationOptions } from 'class-validator';

const opt: ValidationOptions = {
    message: '$property is not a valid id',
};

export function IsObjectId(options = opt) {
    return function (class$: object, propertyName: string) {
        registerDecorator({
            name: 'isObjectId',
            target: class$.constructor,
            propertyName,
            options,
            validator: {
                validate(value: string) {
                    return Types.ObjectId.isValid(value);
                },
            },
        });
    };
}
