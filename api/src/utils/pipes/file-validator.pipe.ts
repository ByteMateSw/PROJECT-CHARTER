import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

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
