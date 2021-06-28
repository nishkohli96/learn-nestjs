import { createParamDecorator } from '@nestjs/common';
import mongoose from 'mongoose';

export const IsObjectId = createParamDecorator((str: string):boolean => {
    // const ObjectId = mongoose.Types.ObjectId;
    // return ObjectId.isValid(new ObjectId(data));
    return mongoose.isValidObjectId(str)
});
