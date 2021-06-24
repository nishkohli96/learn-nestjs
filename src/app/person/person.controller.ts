import { Controller, Get, Param } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  getHello(): string {
    return this.personService.getHello();
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): string {
    console.log(params.id);
    return `This action returns a #${params.id} person`;
  }
}
