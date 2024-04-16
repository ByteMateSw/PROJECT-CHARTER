import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CategoryDto } from 'src/category/dto/category.dto';

/**
 * Data transfer object for creating an office.
 */
export class CreateOfficeDto {
  @IsDefined({ message: 'El nombre del oficio es necesario' })
  @IsString({ message: 'El nombre debe ser un string' })
  @IsAlpha('es-ES', { message: 'El nombre debe contener solo letras.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  name: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;
}
