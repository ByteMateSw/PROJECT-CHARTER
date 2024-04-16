import { IsAlpha, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateCategoryDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un string' })
  @IsAlpha('es-ES', { message: 'El nombre debe contener solo letras.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  name?: string;
}
