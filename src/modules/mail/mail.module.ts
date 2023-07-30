import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

import { MailService } from './mail.service';

const providersAndExports = [MailService];

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('EMAIL_HOST'),
          port: config.get<number>('EMAIL_PORT'),
          secure: false,
          auth: {
            user: config.get<string>('EMAIL_USER'),
            pass: config.get<string>('EMAIL_PASS'),
          },
        },
        template: {
          dir: path.join(path.resolve(), 'templates'),
          adapter: new EjsAdapter(),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...providersAndExports],
  exports: [...providersAndExports],
})
export class MailModule {}
