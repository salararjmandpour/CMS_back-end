import { bold } from 'chalk';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { configService } from './core/config/app.config';
import { SwaggerConfig } from './core/config/swagger.config';

async function bootstrap() {
  const port = configService.get('PORT') || 3000;
  const mode = configService.get('NODE_ENV') || 'development';
  const isDevelopment = configService.get('NODE_ENV') === 'development';

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');

  SwaggerConfig(app);

  await app.listen(port, '0.0.0.0', () => {
    const runningMode = `Server running in ${bold(mode)} mode`;
    const runningOnPort = `on port ${bold(port)}`;
    const runningSince = `[since ${new Date().toISOString()}]`;
    console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`);
    isDevelopment && console.log('🏁 —> RestApi:',`${bold(`http://localhost:${port}/api-docs`)}`);
  });

}
bootstrap();
