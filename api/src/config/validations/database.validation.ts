import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
} from 'class-validator';

export class DatabaseEnvironmentVariables {
  @IsUrl({
    require_port: false,
    require_tld: false,
    require_valid_protocol: false,
  })
  DATABASE_HOST: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Max(65535)
  DATABASE_PORT: number;
}
