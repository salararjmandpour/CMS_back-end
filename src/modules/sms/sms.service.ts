import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { configService } from 'src/core/config/app.config';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { StatusEnum } from '../order/schema/order.schema';

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

  // send password to user sms (ippanel)
  async sendPasswordToUser_ippanel(mobile: string, password: string) {
    const apiKey = configService.get('IPPANEL_API_KEY');
    const baseUrl = configService.get('IPPANEL_BASE_URL');
    const pattern_code = configService.get('IPPANEL_PATTERN');

    const data = {
      pattern_code,
      originator: '+985000404223',
      recipient: mobile,
      values: {
        'verification-code': password,
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
        ResponseMessages.FAILED_SEND_PASSWORD_SMS,
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

  // send otp sms (kavenegar)
  async sendOtpSms_kavenegar(
    mobile: string,
    code: string,
    apiKey: string,
    templateId: string,
  ) {
    try {
      const url =
        'https://api.kavenegar.com/v1/{API-KEY}/sms/countinbox.json?startdate=1409533200&enddate=1410570000&linenumber=10008284&isread=1';
      return await this.httpService.post(url).toPromise();
    } catch (error) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_OTP_SMS,
      );
    }
  }

  // send otp sms (payam-resan)
  async sendOtpSms_payamResan(
    mobile: string,
    code: string,
    apiKey: string,
    templateKey: string,
  ) {
    try {
      const url = `http://api.sms-webservice.com/api/V3/SendTokenSingle?ApiKey=${apiKey}&TemplateKey=${templateKey}&Destination=$${mobile}&p1=${code}`;
      return await this.httpService.get(url).toPromise();
    } catch (error) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_OTP_SMS,
      );
    }
  }

  sendStatusOrder(status: StatusEnum) {}
}
