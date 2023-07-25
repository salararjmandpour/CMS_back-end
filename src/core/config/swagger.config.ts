import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('CMS')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      name: 'Authorization',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);
};
