import { Injectable, PipeTransform } from '@nestjs/common';

/**
 * A pipe that transforms a query parameter into a number.
 */
@Injectable()
export class QueryNumberPipe implements PipeTransform<any> {
  /**
   * Transforms the input value into a number.
   * If the input value is not a number, it is converted to 0.
   * @param value - The value to be transformed.
   * @returns The transformed value.
   */
  async transform(value: any) {
    console.log('Valor', value);
    if (isNaN(value)) value = 0;
    return value;
  }
}
