import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { configService } from 'src/core/config/app.config';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService) {}

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
}
