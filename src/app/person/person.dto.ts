import { IsNumber, IsString, Min, MinLength, IsMongoId } from 'class-validator';

export class LoginDTO {
    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}

export class AddPersonDTO extends LoginDTO {
    @IsString()
    fullName: string;

    @IsNumber()
    @Min(1)
    age: number;

    @IsMongoId()
    city: string;
}

export type BaseResponse<T> = {
    token: T
}