import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    // ParseIntPipe,
    UseGuards,
    // UseInterceptors,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CheckIntPipe } from '../../utils/pipetransform';
import { AuthGuard } from '../../utils/auth.guard';
// import { LoggingInterceptor } from '../../utils/login.interceptor';
import { PersonModel } from '../../models/person.model';
import { AddPersonDTO, LoginDTO, BaseResponse } from './person.dto';

@Controller('person')
@UseGuards(AuthGuard)
// @UseInterceptors(LoggingInterceptor)
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Get()
    getPersons(): Promise<PersonModel[]> {
        return this.personService.getPersons();
    }

    @Post()
    addPerson(@Body() body: AddPersonDTO): Promise<PersonModel> {
        return this.personService.addPerson(body);
    }

    @Get(':id')
    findOne(@Param() params: { id: string }): string {
        console.log(params.id);
        return `This action returns a ${params.id} person`;
    }

    @Post('login')
    loginPerson(@Body() body: LoginDTO): Promise<BaseResponse<string>> {
        return this.personService.loginPerson(body);
    }

    /* Throws 400 if number cant be casted from a string */
    @Get('check/:id')
    typeCheck(@Param('id', new CheckIntPipe()) id: number) {
        // or typeCheck(@Param('id', ParseIntPipe) id: number) {
        return `Param Id: ${id}. env var is ${process.env.DUMMY_KEY}.
        Some str obtained from .env is ${process.env.DUMMY_STR}`;
    }
}
