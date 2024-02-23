import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { IEnvironment } from './interfaces/app.interface';
import { DatabaseNamespaces } from './interfaces/database.interface';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const CurrentNamespace =
      this.configService.get<string>('app.nodeEnv') === IEnvironment.Test
        ? DatabaseNamespaces.Test
        : DatabaseNamespaces.Production;

    return {
      type: 'postgres',
      port: +this.configService.get<number>(`${CurrentNamespace}.port`),
      username: this.configService.get<string>(`${CurrentNamespace}.user`),
      password: this.configService.get<string>(`${CurrentNamespace}.pass`),
      database: this.configService.get<string>(`${CurrentNamespace}.name`),
      synchronize:
        this.configService.get<string>('app.nodeEnv') !==
        IEnvironment.Production,
      entities: [__dirname + '/../**/*entity{.js,.ts}'],
    };
  }
}
