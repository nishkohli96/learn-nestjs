import { IsNumber, IsString, Min } from 'class-validator';
import Types from 'mongoose';
import { IsObjectId } from '../../utils/obj-id.decorator';

export class AddPersonDTO {
    @IsString()
    fullName: string;

    @IsNumber()
    @Min(1)
    age: number;

    @IsObjectId()
    city: Types.ObjectId;
}
