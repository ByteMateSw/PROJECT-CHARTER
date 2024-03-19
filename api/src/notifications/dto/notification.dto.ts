import { 
  IsDate,
  IsDefined, 
  IsNotEmpty, 
  IsPositive, 
  IsString 
} from "class-validator";

export class CreateNotificationsDTO {
  @IsDefined({message:'El titulo de la notificacion es necesario'})
  @IsString({message: 'El titulo debe ser una cadena de caracteres'})
  @IsNotEmpty({message: 'El titulo no puede estar vacio'})
  title: string;


  @IsPositive()
  @IsDate({message: 'La fecha de creacion debe ser valida'})
  creationTime: Date;

  @IsDefined({message:'La descripcion de la notificacion es necesaria'})
  @IsString({message: 'La descripcion debe ser una cadena de caracteres'})
  description: string;
}
