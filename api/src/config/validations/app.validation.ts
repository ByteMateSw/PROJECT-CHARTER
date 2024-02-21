import { IsEnum, IsNumber } from 'class-validator';
import { IEnvironment } from '../interfaces/app.interface';

export class AppEnvironmentVariables {
  @IsEnum(IEnvironment)
  NODE_ENV: IEnvironment;

  @IsNumber()
  PORT: number;
}
