import { IsString } from "class-validator";

export class CreateExperiencieDTO {
    
    @IsString({ message: 'La descripción debe ser un string' })
    title: string;  
  
    @IsString({ message: 'La descripción debe ser un string' })
    description: string;
  }
  