import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
dotenv.config();
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(cookieParser());
  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,               
  });

  const config = new DocumentBuilder()
    .setTitle('Parking Backend example')
    .setDescription('API Documentation for parking backend')
    .setVersion('1.0')
    .addTag('parking')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
