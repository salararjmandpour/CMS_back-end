import { join, resolve } from 'path';
import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MainEmailService } from './main-email.service';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { configService } from 'src/core/config/app.config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
          auth: {
            user: configService.get('EMAIL_USER'),
            pass: configService.get('EMAIL_PASS'),
          },
          pool: true,
          secure: true,
          tls: {
            rejectUnauthorized: false,
          },
        },
        template: {
          dir: join(resolve(), 'templates'),
          adapter: new EjsAdapter(),
        },
      }),
    }),
  ],
  providers: [MainEmailService],
  exports: [MainEmailService],
})
export class MainEmailModule {}
