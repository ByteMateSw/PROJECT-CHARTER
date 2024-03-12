import {
    IsAlpha,
    IsDefined,
    IsNotEmpty,
    IsString
} from "class-validator";

export class stateHiringDTO {
    @IsDefined({message:'El nombre del estado de contrato es necesario'})
    @IsString({ message:'El nombre debe ser un string'})
    @IsAlpha('es-ES', { message: 'El nombre debe contener solo letras.'})
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.'})
    name: string
}