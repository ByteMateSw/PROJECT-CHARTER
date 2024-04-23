import {
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsOptional,
  IsDateString,
  IsAlpha,
} from 'class-validator';

/**
 * Data transfer object for updating a user.
 */
export class UpdateUserDto {
  /**
   * The first name of the user.
   * @remarks
   * - Must be a string.
   * - Cannot be empty.
   * - Must contain only letters.
   * @example John
   */
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @IsAlpha('es-ES', { message: 'El nombre debe contener solo letras.' })
  firstName?: string;

  /**
   * The last name of the user.
   * @remarks
   * - Must be a string.
   * - Cannot be empty.
   * - Must contain only letters.
   * @example Doe
   */
  @IsOptional()
  @IsString({ message: 'El apellido debe ser una cadena de caracteres.' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
  @IsAlpha('es-ES', { message: 'El apellido debe contener solo letras.' })
  lastName?: string;

  /**
   * The username of the user.
   * @remarks
   * - Must be a string.
   * - Cannot be empty.
   * @example johndoe
   */
  @IsOptional()
  @IsString({
    message: 'El nombre de usuario debe ser una cadena de caracteres.',
  })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío.' })
  username?: string;

  /**
   * The email address of the user.
   * @remarks
   * - Must be a valid email address.
   * @example example@domain.com
   */
  @IsOptional()
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email?: string;

  /**
   * The password of the user.
   * @remarks
   * - Must be a string.
   * - Cannot be empty.
   * - Must be a strong password.
   * - Must meet the following criteria:
   *   - Minimum length of 8 characters.
   *   - At least 1 lowercase letter.
   *   - At least 1 uppercase letter.
   *   - At least 1 number.
   *   - At least 1 symbol.
   * @example password123
   */
  @IsOptional()
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
  password?: string;

  /**
   * The phone number of the user.
   * @remarks
   * - Must be a string.
   * - Must be a valid phone number.
   * @example +1234567890
   */
  @IsOptional()
  @IsPhoneNumber(undefined, {
    message: 'El número de teléfono debe de tener un formato válido',
  })
  numberPhone?: string;

  /**
   * The birthday of the user.
   * @remarks
   * - Must be a date.
   * @example 2021-01-01
   */
  @IsOptional()
  @IsDateString(
    { strictSeparator: false },
    { message: 'La fecha de cumpleaños debe de ser una fecha válida.' },
  )
  birthday?: Date;
}
