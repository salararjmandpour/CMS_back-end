import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { ApiGetOTP } from '../docs/get-otp.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { getOtpValidator } from '../validators/get-otp.validator';

export const GetOtpDecorator = () => {
  return applyDecorators(
    ApiGetOTP(),
    Post('get-otp'),
    UsePipes(new JoiValidatorPipe(getOtpValidator)),
  );
};
