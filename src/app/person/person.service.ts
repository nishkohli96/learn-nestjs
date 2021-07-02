import { Injectable } from '@nestjs/common';
import { PersonSchema, PersonModel } from '../../models/person.model';
import { AddPersonDTO } from './person.dto';

@Injectable()
export class PersonService {

    constructor() { }
    
    async getPersons(): Promise<PersonSchema[]> {
        const res = await PersonModel.find({});
        return res;
    }

    async addPerson(body: AddPersonDTO): Promise<PersonSchema> {
        const res = PersonModel.create(body);
        return res;
    }
}
