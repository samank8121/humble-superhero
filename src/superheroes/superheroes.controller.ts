import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSupeHeroDto } from './dto';

@Controller('superheroes')
export class SuperheroesController {
    constructor(private superheroesService: SuperheroesService) {}
    @Get()  
  getAllSuperHeroes() {
    return this.superheroesService.getAllSuperHeroes();
  }
  @Post()  
  createSuperHero(@Body() dto: CreateSupeHeroDto) {
    return this.superheroesService.createSuperHero(dto);
  }
}
