import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

/**
 * Compares a hash with a password and returns a boolean indicating whether they match.
 * @param {string} hash - The hash to compare.
 * @param {string} password - The password to compare.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the hash and password match.
 */
@Injectable()
export class HashService {
  async compareHash(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}
