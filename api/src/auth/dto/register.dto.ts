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

/**
 * Represents the data transfer object for user registration.
 */
export class RegisterDto {
  /**
   * The first name of the user.
   * @remarks
   * - Must be a string.
   * - Cannot be empty.
   * - Must contain only letters.
   */
  @IsString({ message: 'El nombre debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @IsAlpha('es-ES', { message: 'El nombre debe contener solo letras.' })
  firstName: string;

  /**
   * The last name of the user.
   * @remarks
   * - Must be a string.
   * - Cannot be empty.
   * - Must contain only letters.
   */
  @IsString({ message: 'El apellido debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
  @IsAlpha('es-ES', { message: 'El apellido debe contener solo letras.' })
  lastName: string;

  /**
   * The email address of the user.
   * @remarks
   * - Must be a valid email address.
   */
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  /**
   * The password of the user.
   * @remarks
   * - Must be a string.
   * - Cannot be empty.
   * - Must meet the following criteria:
   *   - Minimum length of 8 characters.
   *   - At least 1 lowercase letter.
   *   - At least 1 uppercase letter.
   *   - At least 1 number.
   *   - At least 1 symbol.
   */
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

  /**
   * The phone number of the user.
   * @remarks
   * - Optional field.
   * - Must be a valid phone number.
   */
  @IsOptional()
  @IsPhoneNumber(undefined, {
    message: 'El número de teléfono debe de tener un formato válido',
  })
  numberPhone?: string;

  /**
   * The DNI (National Identity Document) of the user.
   * @remarks
   * - Must be a string.
   * - Cannot exceed 20 characters.
   */
  @IsString({ message: 'El DNI debe ser una cadena de caracteres.' })
  @MaxLength(20, { message: 'El DNI debe de tener hasta 20 caracteres.' })
  dni: string;

  /**
   * The birthday of the user.
   * @remarks
   * - Must be a valid date.
   */
  @IsDateString(
    { strictSeparator: false },
    { message: 'La fecha de cumpleaños debe de ser una fecha válida.' },
  )
  birthday: Date;
}
