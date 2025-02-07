import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateSupeHeroDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  superpower:string; 
  
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore:number;
}

