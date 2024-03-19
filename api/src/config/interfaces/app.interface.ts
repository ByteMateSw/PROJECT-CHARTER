/**
 * Enum representing the possible environments for the application.
 */
export enum IEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

/**
 * Represents the configuration for the application.
 */
export interface IAppConfig {
  nodeEnv: IEnvironment;
  port: number;
  origin: string;
}
