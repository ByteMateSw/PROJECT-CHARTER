import { DatabaseType, EntitySchema, LoggerOptions, MixedList } from 'typeorm';

export interface IDatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize: boolean;
  entities: MixedList<Function | string | EntitySchema>;
  logging: LoggerOptions;
  migrations: MixedList<Function | string>;
  migrationsTableName: string;
}

export enum DatabaseNamespaces {
  Test = 'testdb',
  Production = 'database',
}
