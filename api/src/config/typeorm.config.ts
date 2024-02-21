import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(__dirname + '/../**/*entity{.js,.ts}');
    return {
      type: 'postgres',
      port: +this.configService.get('database.port'),
      username: this.configService.get('database.user'),
      password: this.configService.get('database.pass'),
      database: this.configService.get('database.name'),
      synchronize: true,
      entities: [__dirname + '/../**/*entity{.js,.ts}'],
    };
  }
}
