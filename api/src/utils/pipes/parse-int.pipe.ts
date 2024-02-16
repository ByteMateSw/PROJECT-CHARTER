import { ParseIntPipe } from '@nestjs/common';

const errorMessage = 'El identificador debe ser numérico.';

export const CustomParseIntPipe = new ParseIntPipe({
  exceptionFactory() {
    return errorMessage;
  },
  optional: false,
});
