import { plainToClass } from 'class-transformer';
import { ValidationArguments, validateSync } from 'class-validator';
import { ClassConstructor } from 'class-transformer/types/interfaces';

/**
 * Validates a configuration object using a class constructor and returns the validated config.
 * @param config - The configuration object to validate.
 * @param envVariablesClass - The class constructor used for validation.
 * @returns The validated configuration object.
 * @throws Error if there are validation errors.
 */
export function validateUtil(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<any>,
) {
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      'Error al validar las variables de entorno del archivo .env:\n' +
        errors
          .map(error => Object.values(error.constraints))
          .flat()
          .map(mess => `- ${mess}`)
          .join('\n'),
    );
  }
  return validatedConfig;
}

/**
 * Formats an error message with the property name and the provided message.
 * 
 * @param arg - The validation argument.
 * @param message - The error message.
 * @returns The formatted error message.
 */
export function formatErrorMessage(
  arg: ValidationArguments,
  message: string,
): string {
  return `${arg.property}: ${message}`;
}

/**
 * Creates an error message formatter function.
 * 
 * @param message - The error message to be formatted.
 * @returns A function that takes a ValidationArguments object and returns a formatted error message.
 */
export function createErrorMessageFormatter(
  message: string,
): (arg: ValidationArguments) => string {
  return (arg: ValidationArguments) => formatErrorMessage(arg, message);
}

/**
 * Creates a function that formats an error message for enum validation.
 * @returns A function that takes a ValidationArguments object and returns a formatted error message.
 */
export function createEnumErrorMessageFormatter(): (
  arg: ValidationArguments,
) => string {
  return (arg: ValidationArguments) => {
    const enumValues = Object.values(arg.constraints)
      .flat()
      .filter(value => {
        return typeof value === 'string';
      })
      .join(', ');
    return formatErrorMessage(
      arg,
      `Debe ser uno de los siguientes valores: ${enumValues}.`,
    );
  };
}
