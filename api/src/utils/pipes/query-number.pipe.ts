import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class QueryNumberPipe implements PipeTransform<any> {
  async transform(value: any) {
    console.log('Valor', value);
    if (isNaN(value)) value = 0;
    return value;
  }
}
