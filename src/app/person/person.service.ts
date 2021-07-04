import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { PersonModel } from '../../models/person.model';
import { PersonDAL } from './person.dal';
import { AddPersonDTO, LoginDTO } from './person.dto';
import { hashPswd, verifyPswd } from '../../utils/password';

@Injectable()
export class PersonService {
    constructor(@Inject('PersonDAL') private personDAL: PersonDAL) {}

    async getPersons(): Promise<PersonModel[]> {
        const res = await this.personDAL.findAll({});
        return res;
    }

    async addPerson(body: AddPersonDTO): Promise<PersonModel> {
        const hashedPswd = await hashPswd(body.password);
        console.log('hashedPswd: ', hashedPswd);
        const res = await this.personDAL.create({
            ...body,
            password: hashedPswd,
        });
        return res;
    }

    async loginPerson(body: LoginDTO): Promise<PersonModel> {
        const person = await this.personDAL.findOne({ email: body.email });

        if (!person) {
            throw new ConflictException('No person with this email found');
        }
        const isPswdMatch = await verifyPswd(body.password, person.password);
        
        if (!isPswdMatch) {
            throw new ConflictException('Wrong Password');
        }
        return person;
    }
}
