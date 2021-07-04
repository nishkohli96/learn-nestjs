import { PersonSchema, PersonModel } from '../../models/person.model';
import { BaseDAL } from '../../models/base.dal';

export class PersonDAL extends BaseDAL<PersonModel> {
    constructor() {
        super(PersonSchema);
    }
}
