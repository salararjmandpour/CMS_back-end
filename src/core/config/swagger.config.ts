import { SwaggerTheme } from 'swagger-themes';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Arshida APIs')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      name: 'Authorization',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme('v3');
  const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
  };

  SwaggerModule.setup('api-docs', app, document, options);
};
