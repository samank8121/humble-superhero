import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';
import { CreateSupeHeroDto } from './dto';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { Superpower } from './types/superpower';
import { plainToInstance } from 'class-transformer';

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
      dto.superpower = [Superpower.Strength];
      dto.humilityScore = 0;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('min');
    });
    it('should fail validation if humilityScore is above 10', async () => {
      const dto = new CreateSupeHeroDto();
      dto.name = 'TestHero';
      dto.superpower = [Superpower.Strength];
      dto.humilityScore = 12;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('max');
    });

    it('should fail validation if humilityScore is not integer', async () => {
      const dto = new CreateSupeHeroDto();
      dto.name = 'TestHero';
      dto.superpower = [Superpower.Strength];
      dto.humilityScore = 6.2;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isInt');
    });
    it('should fail validation if a superpower is repeated', async () => {
      const dto = new CreateSupeHeroDto();
      dto.name = 'TestHero';
      dto.superpower = [Superpower.Strength, Superpower.Speed, Superpower.Strength, Superpower.Fly];
      dto.humilityScore = 6;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('arrayUnique');
    });
    it('should encode name on XSS attack', async () => {
      const payload = {
        name: '<script>console.log("test");</script>',
        superpower: [Superpower.Strength, Superpower.Speed],
        humilityScore: 6
      };
      
      const dto = plainToInstance(CreateSupeHeroDto, payload);
      console.log('plainToInstance', dto);
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto.name).not.toContain('<script>');
    });
  });
  describe('Functionality tests', () => {
    it('should add a superhero and return it as a list', () => {
      service.createSuperHero({
        name: 'Hero1',
        superpower: [Superpower.Strength],
        humilityScore: 7,
      });

      expect(service.getAllSuperHeroes()).toEqual([
        { name: 'Hero1', superpower: [Superpower.Strength], humilityScore: 7 },
      ]);
    });
    it('should add some superheroes and return sorted list by humilityScore', () => {
      service.createSuperHero({
        name: 'Hero1',
        superpower: [Superpower.Strength],
        humilityScore: 7,
      });
      service.createSuperHero({
        name: 'Hero2',
        superpower: [Superpower.Speed],
        humilityScore: 5,
      });
      service.createSuperHero({
        name: 'Hero3',
        superpower: [Superpower.Fly],
        humilityScore: 10,
      });

      expect(service.getAllSuperHeroes()).toEqual([
        { name: 'Hero2', superpower: [Superpower.Speed], humilityScore: 5 },
        { name: 'Hero1', superpower: [Superpower.Strength], humilityScore: 7 },
        { name: 'Hero3', superpower: [Superpower.Fly], humilityScore: 10 },
      ]);
    });

    it('should fail validation if duplicate name exists', async () => {
      service.createSuperHero({
        name: 'Hero1',
        superpower: [Superpower.Strength],
        humilityScore: 7,
      });

      try {
        service.createSuperHero({
          name: 'Hero1',
          superpower: [Superpower.Speed],
          humilityScore: 5,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Superhero with this name already exists');
      }
    });
  });
});
