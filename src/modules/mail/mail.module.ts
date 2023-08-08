import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailService } from './mail.service';
import { join, resolve } from 'path';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmailSettings,
  EmailSettingsSchema,
} from './schemas/email-settings.schema';
import { MailController } from './mail.controller';
import { MailRepository } from './mail.repository';

const providersAndExports = [MailService];
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSettings.name, schema: EmailSettingsSchema },
    ]),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('EMAIL_HOST'),
          port: config.get<number>('EMAIL_PORT'),
          auth: {
            user: config.get<string>('EMAIL_USER'),
            pass: config.get<string>('EMAIL_PASS'),
          },
        },
        template: {
          dir: join(resolve(), 'templates'),
          adapter: new EjsAdapter(),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [...providersAndExports, MailRepository],
  exports: [...providersAndExports],
})
export class MailModule {}
