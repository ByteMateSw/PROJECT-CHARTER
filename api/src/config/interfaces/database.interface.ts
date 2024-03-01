import { DatabaseType, EntitySchema, LoggerOptions, MixedList } from 'typeorm';

/**
 * Represents the configuration for a database connection.
 */
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

/**
 * Enum representing the namespaces for different databases.
 */
export enum DatabaseNamespaces {
  Test = 'testdb',
  Production = 'database',
}
