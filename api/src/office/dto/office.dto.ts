import { 
    IsAlpha,
    IsDefined,
    IsNotEmpty, 
    IsString 
} from "class-validator";

/**
 * Data transfer object for creating an office.
 */
export class OfficeDto {
    @IsDefined({message:'El nombre del oficio es necesario'})
    @IsString({message: 'El nombre debe ser un string'})
    @IsAlpha('es-ES', { message: 'El nombre debe contener solo letras.'})
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    name: string;
  }