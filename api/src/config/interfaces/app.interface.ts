export enum IEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export interface IAppConfig {
  nodeEnv: IEnvironment;
  port: number;
}
