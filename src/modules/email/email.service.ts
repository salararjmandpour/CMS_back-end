import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { EmailSettingsRepository } from '../settings/repositories/email-settings.repository';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private emailSettingsRepository: EmailSettingsRepository,
  ) {}

  async sendOtpEmail(email: string, code: string) {
    try {
      const data = await this.emailSettingsRepository.findAll();
      const emailConfig = (data.length !== 0 && data[0]) || null;

      await this.mailerService.sendMail({
        from: emailConfig?.senderEmail || null,
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
