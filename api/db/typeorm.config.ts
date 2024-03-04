import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { IEnvironment } from 'src/config/interfaces/app.interface';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: parseInt(configService.get('DATABASE_PORT'), 10) || 5432,
  database: configService.get('DATABASE_NAME'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  synchronize: configService.get('NODE_ENV') !== IEnvironment.Production,
  entities: [__dirname + '/../src/**/*entity{.js,.ts}'],
  logging: configService.get('NODE_ENV') !== IEnvironment.Development,
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
  migrationsTableName: 'migrations',
});
