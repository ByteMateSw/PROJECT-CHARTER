import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class HashService {
  async compareHash(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}
