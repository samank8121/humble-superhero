import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSupeHeroDto, GetSuperHeroDto } from './dto';
import { SupeHeroApiSwagger } from './decorator/superhero-api.decorator';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private superheroesService: SuperheroesService) {}
  @Get()
  @SupeHeroApiSwagger({
    responseType: GetSuperHeroDto
  })
  getAllSuperHeroes() {
    return this.superheroesService.getAllSuperHeroes();
  }
  @Post()
  @SupeHeroApiSwagger({
    responseType: GetSuperHeroDto,
    httpStatus: HttpStatus.CREATED
  })
  createSuperHero(@Body() dto: CreateSupeHeroDto) {
    return this.superheroesService.createSuperHero(dto);
  }
}
