import { ApiProperty } from '@nestjs/swagger';
import { Superpower } from '../types/superpower';

export class GetSuperHeroDto {
  @ApiProperty({
    description: 'name of the superhero',
    example: 'superman',
  })
  name: string;

  @ApiProperty({
    description: 'power of the superhero which is an array of superpowers and each superpower must be unique in the array',
    example: ["fly","strength"],
  })
  superpower: Superpower[];

  @ApiProperty({
    description: 'score between 1 and 10',
    example: '3',
  })
  humilityScore: number;
}