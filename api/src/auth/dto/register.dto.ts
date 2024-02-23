import {
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsDateString,
  IsAlpha,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'El nombre debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @IsAlpha('es-AR', { message: 'El nombre debe contener solo letras.' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
  @IsAlpha('es-AR', { message: 'El apellido debe contener solo letras.' })
  lastName: string;

  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minSymbols: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    {
      message:
        'La contraseña debe contener al menos 8 carácteres, de los cuales 1 debe ser un símbolo, un número, una letra mayúscula y minúscula',
    },
  )
  password: string;

  @IsOptional()
  @IsPhoneNumber(undefined, {
    message: 'El número de teléfono debe de tener un formato válido',
  })
  numberPhone?: string;

  @IsString({ message: 'El DNI debe ser una cadena de caracteres.' })
  @MaxLength(20, { message: 'El DNI debe de tener hasta 20 caracteres.' })
  dni: string;

  @IsDateString(
    { strictSeparator: false },
    { message: 'La fecha de cumpleaños debe de ser una fecha válida.' },
  )
  birthday: Date;
}
