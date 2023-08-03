import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class MailService {
  constructor(private emailService: MailerService) {}

  async sendOtpMail(email: string, code: string) {
    try {
      await this.emailService.sendMail({
        from: 'mailTest@mail.com',
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
