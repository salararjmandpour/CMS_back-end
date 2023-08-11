import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { configService } from 'src/core/config/app.config';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService) {}

  // send otp sms (ippanel)
  async sendOtpSms_ippanel(mobile: string, code: string) {
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

  // send otp sms (sms.ir)
  async sendOtpSms_smsDotIr(mobile: string, code: string, apiKey: string) {
    const apiUrl = 'https://api.sms.ir/v1/send/verify';

    const data = {
      mobile,
      templateId: 100000,
      parameters: [
        {
          name: 'code',
          value: code,
        },
      ],
    };

    const config = {
      headers: {
        'X-API-KEY': apiKey,
        ACCEPT: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      return await this.httpService.post(apiUrl, data, config).toPromise();
    } catch (err) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_OTP_SMS,
      );
    }
  }

  // send otp sms (sms.ir)
  async sendOtpSms_(mobile: string, code: string, templateId: string) {
    
  }
}
