import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appListener, port } from './core/config/app.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, appListener);
}
bootstrap();
