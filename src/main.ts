import * as path from 'path';
import { bold } from 'chalk';
import * as moment from 'moment-timezone';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { AppModule } from './app.module';
import { configService } from './core/config/app.config';
import { SwaggerConfig } from './core/config/swagger.config';

async function bootstrap() {
  const port = configService.get('PORT') || 3000;
  const mode = configService.get('NODE_ENV') || 'development';
  const isDevelopment = configService.get('NODE_ENV') === 'development';

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  moment.tz.setDefault('Asia/Tehran');

  app.useStaticAssets('uploads', {
    prefix: '/uploads/',
  });

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'templates'));
  app.setViewEngine('ejs');

  SwaggerConfig(app);

  await app.listen(port, '0.0.0.0', () => {
    const runningMode = `Server running in ${bold(mode)} mode`;
    const runningOnPort = `on port ${bold(port)}`;
    const runningSince = `[since ${moment().format()}]`;
    console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`);
    isDevelopment &&
      console.log(
        '🏁 —> RestApi:',
        `${bold(`http://localhost:${port}/api-docs`)}`,
      );
  });
}
bootstrap();
