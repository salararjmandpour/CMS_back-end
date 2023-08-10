import { join, resolve } from 'path';
import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

import { EmailService } from './email.service';
import { SettingsService } from '../settings/settings.service';
import { PublicSettingsRepository } from '../settings/repositories/public-settings.repository';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (
        config: ConfigService,
        settingsRepository: PublicSettingsRepository,
        settingsService: SettingsService,
      ) => {
        const data = await settingsRepository.findAll();
        console.log({ data });
        console.log('test', 2023);
        return {
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
        };
      },
      inject: [ConfigService, PublicSettingsRepository, SettingsService],
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
