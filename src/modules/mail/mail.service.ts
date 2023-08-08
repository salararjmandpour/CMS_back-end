import { MailerService } from '@nestjs-modules/mailer';
import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { MailRepository } from './mail.repository';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { configService } from 'src/core/config/app.config';
import { SetConfigDto } from './dto/set-config.dto';

@Injectable()
export class MailService {
  constructor(
    private emailService: MailerService,
    private mailRepository: MailRepository,
  ) {}

  async sendOtpMail(email: string, code: string) {
    try {
      await this.emailService.sendMail({
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

  async setConfig(data: SetConfigDto): Promise<ResponseFormat<any>> {
    let mailSettings = await this.mailRepository.findAll();

    if (!mailSettings || mailSettings.length === 0) {
      const createdResult = await this.mailRepository.create(data);
      if (!createdResult) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_CREATE_EMAIL_CONFIG,
        );
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: {
          emailConfig: createdResult,
        },
      };
    }

    const updateResult: any = await this.mailRepository.findAndUpdate(
      data?._id,
      {
        host: data.host,
        port: data.port,
        user: data.user,
        pass: data.pass,
        senderEmail: data.senderEmail,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SET_CONFIG_EMAIL,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        emailConfig: updateResult,
      },
    };
  }

  async getConfig(): Promise<ResponseFormat<any>> {
    let smsSettings = await this.mailRepository.findAll();
    if (!smsSettings || smsSettings.length === 0) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_EMAIL_CONFIG);
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        smsConfig: smsSettings[0],
      },
    };
  }
}
