import { plainToClass } from 'class-transformer';
import { ValidationArguments, validateSync } from 'class-validator';
import { ClassConstructor } from 'class-transformer/types/interfaces';

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

export function formatErrorMessage(
  arg: ValidationArguments,
  message: string,
): string {
  return `${arg.property}: ${message}`;
}

export function createErrorMessageFormatter(
  message: string,
): (arg: ValidationArguments) => string {
  return (arg: ValidationArguments) => formatErrorMessage(arg, message);
}

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
