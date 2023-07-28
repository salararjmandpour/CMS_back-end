import axios from 'axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { configService } from 'src/core/config/app.config';

@Injectable()
export class SmsService {
  async sendOtpSms(mobile: string, code: string) {
    const apiKey = configService.get('IPPANEL_API_KEY')
    const baseUrl = configService.get('IPPANEL_BASE_URL');
    const message = `کد ورود شما: ${code}`;
    
    try {
      // const response = await axios.post(
      //   baseUrl,
      //   {
      //     originator: '+985000404223',
      //     recipients: [mobile],
      //     message,
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `AccessKey ${apiKey}`,
      //     },
      //   },
      // );

    } catch (err) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_OTP_SMS,
      );
    }
  }
}
