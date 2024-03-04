import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

/**
 * A pipe that transforms a query parameter into a number.
 */
@Injectable()
export class QueryNumberPipe implements PipeTransform<any> {
  /**
   * Transforms the input value into a number.
   * @param value - The value to be transformed.
   * @param metadata - Additional information about the value.
   * The data property contains the name of the query parameter.
   * @throws BadRequestException if the value is not a number.
   * @returns The transformed value.
   */
  async transform(value: any, metadata: any) {
    console.log('Metadata:', metadata);
    if (isNaN(value))
      throw new BadRequestException(
        `Invalid number in ${metadata.data} query parameter`,
      );
    return value;
  }
}
