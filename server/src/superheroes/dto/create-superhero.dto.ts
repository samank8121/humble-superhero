import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsIn, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { filterXSS } from 'xss';
import { Superpower } from '../types/superpower';

export class CreateSupeHeroDto {
  @ApiProperty({
    description: 'name of the superhero',
    example: 'superman',
  })
  //For xss attack
  @Transform(({ value }) => filterXSS(value))
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'power of the superhero which is an array of superpowers and each superpower must be unique in the array',
    example: ["fly","strength"],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsIn(Object.values(Superpower), { each: true })
  superpower: Superpower[];
  
  @ApiProperty({
    description: 'score between 1 and 10',
    example: '3',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore:number;
}

