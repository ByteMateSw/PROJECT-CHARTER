export enum IEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export interface IAppConfig {
  nodeEnv: IEnvironment;
  port: number;
}
