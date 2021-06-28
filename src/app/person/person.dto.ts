import { IsNumber, IsString, Min } from 'class-validator';

export class AddPersonDTO {
    @IsString()
    fullName: string;

    @IsNumber()
    @Min(1)
    age: number;
}
