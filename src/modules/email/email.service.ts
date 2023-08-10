import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { configService } from 'src/core/config/app.config';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendOtpEmail(email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        from: configService.get('SENDER_EMAIL'),
        to: email,
        subject: `تایید آدرس ایمیل - شرکت آرشیدا تب ترنج`,
        context: {
          code,
        },
        template: 'verify-email.ejs',
      });
    } catch (err) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_OTP_EMAIL,
      );
    }
  }
}
