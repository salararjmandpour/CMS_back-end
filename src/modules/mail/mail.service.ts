import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailConstant } from 'src/core/constants/mail.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class MailService {
  constructor(private emailService: MailerService) {}

  async sendOtpMail(email: string, code: string) {
    try {
      await this.emailService.sendMail({
        from: MailConstant.FROM,
        to: email,
        subject: `ارسال کد ورود`,
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
