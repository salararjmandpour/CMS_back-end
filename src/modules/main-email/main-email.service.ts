import { MailerService } from '@nestjs-modules/mailer';
import { configService } from 'src/core/config/app.config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class MainEmailService {
  constructor(private mailerService: MailerService) {}

  async sendًPasswordToAdmin(email: string, password: string) {
    try {
      await this.mailerService.sendMail({
        from: 'mailTest@mail.com',
        to: email,
        subject: `ارسال پسورد ورود به پنل ادمین - شرکت آرشیدا تب ترنج`,
        context: {
          password,
        },
        template: 'send-password.ejs',
      });
    } catch (err) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_PASSWORD_EMAIL,
      );
    }
  }
  
  async sendًForgotPassword(email: string, link: string) {
    try {
      await this.mailerService.sendMail({
        from: 'mailTest@mail.com',
        to: email,
        subject: `بازنشانی رمز عبور - شرکت آرشیدا تب ترنج`,
        context: {
          link,
        },
        template: 'send-password.ejs',
      });
    } catch (err) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_PASSWORD_EMAIL,
      );
    }
  }
}
