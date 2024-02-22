import { BadRequestException, ParseIntPipe } from '@nestjs/common';

const errorMessage = 'El identificador debe ser numérico.';

export const CustomParseIntPipe = new ParseIntPipe({
  exceptionFactory() {
    throw new BadRequestException(errorMessage);
  },
  optional: false,
});
