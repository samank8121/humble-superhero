import { ApiProperty } from '@nestjs/swagger';

export class GetSuperHeroDto {
  @ApiProperty({
    description: 'name of the superhero',
    example: 'superman',
  })
  name: string;

  @ApiProperty({
    description: 'power of the superhero',
    example: 'fly',
  })
  superpower: string;

  @ApiProperty({
    description: 'score between 1 and 10',
    example: '3',
  })
  humilityScore: number;
}