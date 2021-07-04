import { Injectable, Inject } from '@nestjs/common';
import { PersonModel } from '../../models/person.model';
import { PersonDAL } from './person.dal';
import { AddPersonDTO } from './person.dto';

@Injectable()
export class PersonService {
    constructor(
        @Inject("PersonDAL") private personDAL: PersonDAL ,
    ) {}

    async getPersons(): Promise<PersonModel[]> {
        const res = await this.personDAL.findAll({});
        return res;
    }

    async addPerson(body: AddPersonDTO): Promise<PersonModel> {
        const res = await this.personDAL.create(body);
        return res;
    }
}
