import {
  ArgumentMetadata,
  HttpStatus,
  InternalServerErrorException,
  ParseFilePipeBuilder,
  PipeTransform,
} from '@nestjs/common';
import { File } from '../types/functions.type';
import { changeNameFile, generateRandomName } from '../tools/files';

/**
 * FilePipeValidator is a pipe validator for images uploads.
 * It validates the image type and size.
 * @throws UnprocessableEntityException if the file is not valid.
 */
export const FilePipeValidator = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: '.(png|jpeg|jpg)',
  })
  .addMaxSizeValidator({
    maxSize: 20000000,
    message: 'El archivo debe de tener menos de 20MB',
  })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    fileIsRequired: false,
  });

export class RandomFilesNamePipe implements PipeTransform<File[]> {
  transform(file: File[]): File[] {
    file.map(file => {
      file.originalname = changeNameFile(
        file.originalname,
        generateRandomName(),
      );
    });
    return file;
  }
}

export class FileNamePipe implements PipeTransform<File> {
  private filename: string;
  constructor(filename: string) {
    this.filename = filename;
  }
  transform(file: File): File {
    file.originalname = changeNameFile(file.originalname, this.filename);
    return file;
  }
}
