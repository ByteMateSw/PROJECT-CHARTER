import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class HashPipe implements PipeTransform<any> {
  async transform(value: any) {
    if (!value.password) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    const hash = await argon2.hash(value.password);
    value.password = hash;
    return value;
  }
}
