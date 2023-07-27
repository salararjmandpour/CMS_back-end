import axios from 'axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class SmsService {
  async sendOtpSms(mobile: string, code: string) {
    const apiKey = process.env.IPPANEL_API_KEY;
    const baseUrl = 'http://rest.ippanel.com/v1/messages';
    const message = `کد ورود شما: ${code}`;

    try {
      const response = await axios.post(
        baseUrl,
        {
          originator: '+985000404223',
          recipients: [mobile],
          message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `AccessKey ${apiKey}`,
          },
        },
      );

      console.log({ mobile, message, response });
    } catch (err) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_OTP_SMS,
      );
    }
  }
}
