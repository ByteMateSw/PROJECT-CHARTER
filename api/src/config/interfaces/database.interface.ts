export interface IDatabaseConfig {
  host: string;
  name: string;
  user: string;
  pass: string;
  port: number;
}

export enum DatabaseNamespaces {
  Test = 'testdb',
  Production = 'database',
}
