import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('API document')
    .setDescription('Documentacion de la aplicacion')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('ORIGIN'),
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  const port = configService.get('PORT');
  await app.listen(port);
}

bootstrap();
