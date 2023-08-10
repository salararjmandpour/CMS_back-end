import { join, resolve } from 'path';
import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

import { EmailService } from './email.service';
import { EmailSettingsRepository } from '../settings/repositories/email-settings.repository';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (emailSettingsRepository: EmailSettingsRepository) => {
        const data = await emailSettingsRepository.findAll();
        const emailConfig = (data.length !== 0 && data[0]) || null;

        return {
          transport: {
            host: emailConfig?.host || null,
            port: +emailConfig?.port || null,
            auth: {
              user: emailConfig?.user || null,
              pass: emailConfig?.pass || null,
            },
          },
          template: {
            dir: join(resolve(), 'templates'),
            adapter: new EjsAdapter(),
          },
        };
      },
      inject: [EmailSettingsRepository],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
