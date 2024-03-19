import { BadRequestException, ParseIntPipe } from '@nestjs/common';

/**
 * Error message for when the CustomParseIntPipe fails to parse a string into an integer.
 */
const errorMessage = 'El identificador debe ser numérico.';

/**
 * CustomParseIntPipe is a custom pipe that parses a string into an integer.
 * @throws BadRequestException if the parsing fails with a specified error message.
 */
export const CustomParseIntPipe = new ParseIntPipe({
  exceptionFactory() {
    throw new BadRequestException(errorMessage);
  },
  optional: false,
});
