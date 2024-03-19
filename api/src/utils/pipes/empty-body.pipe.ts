import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * A pipe that checks if the request body is empty.
 * @param value - The request body.
 * @returns The request body if it is not empty.
 * @throws BadRequestException if the request body is empty.
 */
@Injectable()
export class EmptyBodyPipe implements PipeTransform<any> {
  transform(value: any) {
    if (Object.keys(value).length === 0) {
      throw new BadRequestException(
        'El cuerpo de la solicitud no puede estar vacío',
      );
    }
    return value;
  }
}
