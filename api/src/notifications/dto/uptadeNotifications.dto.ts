import { 
  IsOptional,
   IsString 
  } from "class-validator";

export class UptadeNotificationsDTO {

  @IsOptional()
  @IsString({message:'el titulo debe ser una cadena de caracteres'})
  title?: string;

  @IsOptional()
  @IsString({message:'La descripcion debe ser una cadena de caracteres'})
  description?: string;
}
