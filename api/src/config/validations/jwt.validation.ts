import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ISamesite } from '../interfaces/jwt.interface';

export class JWTEnvironmentVariables {
  @IsString()
  JWT_ACCESS_SECRET_KEY: string;

  @IsString()
  EXPIRATION_TIME_ACCESS_TOKEN: string;

  @IsString()
  JWT_REFRESH_SECRET_KEY: string;

  @IsString()
  EXPIRATION_TIME_REFRESH_TOKEN: string;

  @IsBoolean()
  @IsOptional()
  SECURE: boolean;

  @IsNumber()
  @IsOptional()
  MAX_AGE: number;

  @IsEnum(ISamesite)
  SAMESITE: ISamesite;
}
