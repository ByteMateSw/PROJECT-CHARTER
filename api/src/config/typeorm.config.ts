import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { IEnvironment } from './interfaces/app.interface';
import { DatabaseNamespaces } from './interfaces/database.interface';

/**
 * TypeOrmConfigService is a class that is responsible for creating the TypeORM
 * configuration options based on the current environment.
 */
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  /**
   * createTypeOrmOptions is a method that creates the TypeORM configuration options.
   * It determines the current namespace based on the app.nodeEnv configuration value,
   * and returns the configuration options for that namespace.
   * @returns The TypeORM configuration options for the current namespace.
   */
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const CurrentNamespace =
      this.configService.get<string>('app.nodeEnv') === IEnvironment.Test
        ? DatabaseNamespaces.Test
        : DatabaseNamespaces.Production;

    return {
      ...this.configService.get(`${CurrentNamespace}`),
    };
  }
}
