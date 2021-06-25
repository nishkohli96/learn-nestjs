import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CheckIntPipe } from '../../utils/pipetransform';
import { AuthGuard } from '../../utils/auth.guard';
import { LoggingInterceptor } from '../../utils/login.interceptor';

@Controller()
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Get()
    getHello(): string {
        return this.personService.getHello();
    }

    @Get(':id')
    findOne(@Param() params: { id: string }): string {
        console.log(params.id);
        return `This action returns a ${params.id} person`;
    }

    /* Throws 400 if number cant be casted from a string */
    @Get('person/:id')
    typeCheck(@Param('id', new CheckIntPipe()) id: number) {
        // or typeCheck(@Param('id', ParseIntPipe) id: number) {
        return `Param Id: ${id}. env var is ${process.env.DUMMY_KEY}`;
    }
}
