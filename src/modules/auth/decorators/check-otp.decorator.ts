import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { ApiCheckOTP } from '../docs/check-otp.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { checkOtpValidator } from '../validators/check-otp.validator';

export const CheckOtpDecorator = () => {
  return applyDecorators(
    ApiCheckOTP(),
    Post('check-otp'),
    UsePipes(new JoiValidatorPipe(checkOtpValidator)),
  );
};
