import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';

/**
 * HashPipe class is a custom pipe used to hash the password value.
 */
@Injectable()
export class HashPasswordPipe implements PipeTransform<any> {
  /**
   * Transforms the input value by hashing the password.
   * @param value - The value to be transformed.
   * @returns The transformed value with the password hashed.
   * @throws BadRequestException if the value does not have a password property.
   */
  async transform(value: any) {
    if (!value.password) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    const hash = await argon2.hash(value.password);
    value.password = hash;
    return value;
  }
}
