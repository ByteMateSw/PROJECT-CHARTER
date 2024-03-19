import { IsEmail, IsString } from 'class-validator';

/**
 * Data transfer object for login information.
 */
export class LoginDto {
  /**
   * The email address of the user.
   * @remarks
   * - Must be a valid email address.
   * - Cannot be empty.
   * - Must be a string.
   * @example example@domain.com
   */
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  /**
   * The password of the user.
   * @remarks
   * - Must be a string.
   * - Cannot be empty.
   * @example password123
   */
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres.' })
  password: string;
}
