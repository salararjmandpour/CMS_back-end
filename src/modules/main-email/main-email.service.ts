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

      return true;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_PASSWORD_EMAIL,
      );
    }
  }

  async sendًPasswordToUser(email: string, password: string) {
    try {
      await this.mailerService.sendMail({
        from: 'mailTest@mail.com',
        to: email,
        subject: `ارسال پسورد - شرکت آرشیدا تب ترنج`,
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
      await this.mailerService
        .sendMail({
          from: 'info@irwebs.com',
          to: email,
          subject: 'بازنشانی رمز عبور - شرکت آرشیدا تب ترنج',
          context: {
            link,
          },
          template: 'reset-password.ejs',
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (err) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_PASSWORD_EMAIL,
      );
    }
  }
}
