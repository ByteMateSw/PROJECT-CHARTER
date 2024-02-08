import { IsString, Length } from "class-validator";

export class CreateLocalizationDto {
  @IsString()
  city: string;

  @IsString()
  country: string;
  
  @IsString()
  capital: string;
}
