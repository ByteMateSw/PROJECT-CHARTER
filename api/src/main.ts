import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { EnviarMailVerificación } from './user/user.mailer';
require("dotenv").config();

const { PORT } = process.env;
const port: string = PORT || "3002";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

EnviarMailVerificación();
bootstrap();
