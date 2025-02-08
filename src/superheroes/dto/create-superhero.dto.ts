import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateSupeHeroDto {
  @ApiProperty({
    description: 'name of the superhero',
    example: 'superman',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'power of the superhero',
    example: 'fly',
  })
  @IsNotEmpty()
  superpower:string; 
  
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

