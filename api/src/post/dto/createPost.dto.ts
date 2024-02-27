import {
  IsDefined,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePostDto {
  @IsDefined({ message: 'El post necesita título' })
  @IsString({
    message: 'El título del post necesita ser una cadena de carácteres',
  })
  title: string;

  @IsDefined({ message: 'El post necesita título' })
  @IsString({
    message: 'El título del post necesita ser una cadena de carácteres',
  })
  description: string;

  @IsOptional()
  @IsPositive({ message: 'El precio debe ser un número positivo.' })
  @Max(1000000, { message: 'El precio no puede sobrepasar los $1000000' })
  price?: number;
}
