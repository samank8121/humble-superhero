import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';
import { CreateSupeHeroDto } from './dto';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroesService],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('DTO tests', () => {
    it('should fail validation if humilityScore is below 1', async () => {
      const dto = new CreateSupeHeroDto();
      dto.name = 'TestHero';
      dto.superpower = 'Strength';
      dto.humilityScore = 0;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('min');
    });
    it('should fail validation if humilityScore is above 10', async () => {
      const dto = new CreateSupeHeroDto();
      dto.name = 'TestHero';
      dto.superpower = 'Strength';
      dto.humilityScore = 12;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('max');
    });

    it('should fail validation if humilityScore is not integer', async () => {
      const dto = new CreateSupeHeroDto();
      dto.name = 'TestHero';
      dto.superpower = 'Strength';
      dto.humilityScore = 6.2;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isInt');
    });
  });
  describe('Functionality tests', () => {
    it('should add a superhero and return it as a list', () => {
      service.createSuperHero({
        name: 'Hero1',
        superpower: 'Strength',
        humilityScore: 7,
      });

      expect(service.getAllSuperHeroes()).toEqual([
        { name: 'Hero1', superpower: 'Strength', humilityScore: 7 },
      ]);
    });
    it('should add some superheroes and return sorted list by humilityScore', () => {
      service.createSuperHero({
        name: 'Hero1',
        superpower: 'Strength',
        humilityScore: 7,
      });
      service.createSuperHero({
        name: 'Hero2',
        superpower: 'Speed',
        humilityScore: 5,
      });
      service.createSuperHero({
        name: 'Hero3',
        superpower: 'Fly',
        humilityScore: 10,
      });

      expect(service.getAllSuperHeroes()).toEqual([
        { name: 'Hero2', superpower: 'Speed', humilityScore: 5 },
        { name: 'Hero1', superpower: 'Strength', humilityScore: 7 },
        { name: 'Hero3', superpower: 'Fly', humilityScore: 10 },
      ]);
    });

    it('should fail validation if duplicate name exists', async () => {
      service.createSuperHero({
        name: 'Hero1',
        superpower: 'Strength',
        humilityScore: 7,
      });

      try {
        service.createSuperHero({
          name: 'Hero1',
          superpower: 'Speed',
          humilityScore: 5,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Superhero with this name already exists');
      }
    });
  });
});
