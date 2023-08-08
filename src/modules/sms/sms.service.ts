import {
  Injectable,
  InternalServerErrorException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { configService } from 'src/core/config/app.config';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { SetConfigDto } from './dto/set-config.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { SmsRepository } from './sms.repository';

@Injectable()
export class SmsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly smsRepository: SmsRepository,
  ) {}

  async sendOtpSms(mobile: string, code: string) {
    const apiKey = configService.get('IPPANEL_API_KEY');
    const baseUrl = configService.get('IPPANEL_BASE_URL');
    const pattern_code = configService.get('IPPANEL_PATTERN');

    const data = {
      pattern_code,
      originator: '+985000404223',
      recipient: mobile,
      values: {
        'verification-code': code,
      },
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `AccessKey ${apiKey}`,
      },
    };

    try {
      return await this.httpService.post(baseUrl, data, config).toPromise();
    } catch (err) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_OTP_SMS,
      );
    }
  }

  async setConfig(data: SetConfigDto): Promise<ResponseFormat<any>> {
    let smsSettings = await this.smsRepository.findAll();

    if (!smsSettings || smsSettings.length === 0) {
      const createdResult = await this.smsRepository.create(data);
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

    const updateResult = await this.smsRepository.findAndUpdate(
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

  async getConfig(): Promise<ResponseFormat<any>> {
    let smsSettings = await this.smsRepository.findAll();
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
}
