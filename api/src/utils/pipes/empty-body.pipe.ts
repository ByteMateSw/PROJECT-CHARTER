import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

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
