import { Injectable } from '@nestjs/common';
import { PersonSchema, PersonModel } from '../../models/person.model';
import { AddPersonDTO } from './person.dto';

@Injectable()
export class PersonService {
    constructor() {}

    async getPersons(): Promise<PersonModel[]> {
        const res = await PersonSchema.find({});
        return res;
    }

    async addPerson(body: AddPersonDTO): Promise<PersonModel> {
        const res = PersonSchema.create(body);
        return res;
    }
}
