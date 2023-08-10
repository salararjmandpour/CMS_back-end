import {
  Injectable,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { SmsSettingsRepository } from './repositories/sms-settings.repository';
import { EmailSettingsRepository } from './repositories/email-settings.repository';
import { PublicSettingsRepository } from './repositories/public-settings.repository';

import { SetSmsConfigDto } from './dtos/set-sms-config.dto';
import { SetEmailConfigDto } from './dtos/set-email-config.dto';

import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class SettingsService {
  constructor(
    private publicSettingsRepository: PublicSettingsRepository,
    private emailSettingsRepository: EmailSettingsRepository,
    private smsSettingsRepository: SmsSettingsRepository,
  ) {}

  // get public settings
  async getPublicSettings(): Promise<ResponseFormat<any>> {
    return {
      statusCode: HttpStatus.OK,
    };
  }

  // get email config
  async getEmailConfig(): Promise<ResponseFormat<any>> {
    let emailSettings = await this.emailSettingsRepository.findAll();
    if (!emailSettings || emailSettings.length === 0) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_EMAIL_CONFIG);
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        emailConfig: emailSettings[0],
      },
    };
  }

  // set email config
  async setEmailConfig(data: SetEmailConfigDto): Promise<ResponseFormat<any>> {
    let emailSettings = await this.emailSettingsRepository.findAll();

    if (!emailSettings || emailSettings.length === 0) {
      const createdResult = await this.emailSettingsRepository.create(data);
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

    const updateResult: any = await this.emailSettingsRepository.findAndUpdate(
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

  // get sms config
  async getSmsConfig(): Promise<ResponseFormat<any>> {
    let smsSettings = await this.smsSettingsRepository.findAll();
    if (!smsSettings || smsSettings.length === 0) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_SMS_CONFIG);
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        smsConfig: smsSettings[0],
      },
    };
  }

  // set sms config
  async setSmsConfig(data: SetSmsConfigDto): Promise<ResponseFormat<any>> {
    let smsSettings = await this.smsSettingsRepository.findAll();

    if (!smsSettings || smsSettings.length === 0) {
      const createdResult = await this.smsSettingsRepository.create(data);
      if (!createdResult) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_CREATE_SMS_CONFIG,
        );
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: {
          smsConfig: createdResult,
        },
      };
    }

    const updateResult = await this.smsSettingsRepository.findAndUpdate(
      data?._id,
      {
        panel: data.panel,
        username: data.username,
        password: data.password,
        senderNumber: data.senderNumber,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SET_CONFIG_SMS,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        smsConfig: updateResult,
      },
    };
  }
}
