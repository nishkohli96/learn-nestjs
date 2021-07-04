import { IsNumber, IsString, Min, MinLength, IsMongoId } from 'class-validator';

export class AddPersonDTO {
    @IsString()
    fullName: string;

    @IsNumber()
    @Min(1)
    age: number;

    @IsMongoId()
    city: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}
