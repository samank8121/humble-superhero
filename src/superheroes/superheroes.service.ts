import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSupeHeroDto } from './dto';

@Injectable()
export class SuperheroesService {
  private superheroes: CreateSupeHeroDto[];
  constructor() {
    this.superheroes = [];
  }
  createSuperHero(dto: CreateSupeHeroDto) {
    const isDuplicate = this.superheroes.some((hero) => hero.name === dto.name);
    if (isDuplicate) {
      throw new BadRequestException('Superhero with this name already exists');
    }
    this.superheroes.push(dto);
    return this.getAllSuperHeroes();
  }
  getAllSuperHeroes() {
    return this.superheroes.sort((a, b) => a.humilityScore - b.humilityScore);
  }
}
