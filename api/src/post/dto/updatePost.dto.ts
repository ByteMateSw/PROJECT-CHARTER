import { IsOptional, IsPositive, IsString, Max } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString({
    message: 'El título del post necesita ser una cadena de carácteres',
  })
  title?: string;

  @IsOptional()
  @IsString({
    message: 'El título del post necesita ser una cadena de carácteres',
  })
  description?: string;

  @IsOptional()
  @IsPositive({ message: 'El precio debe ser un número positivo.' })
  @Max(1000000, { message: 'El precio no puede sobrepasar los $1000000' })
  price?: number;
}
