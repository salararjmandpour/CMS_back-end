import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { getOtpValidation } from './validations/get-otp.validation';
import { GetOtpDto } from './dtos/get-otp.dto';
import { checkOtpSchema } from './validations/check-otp.validation';
import { CheckOtpDto } from './dtos/check-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('get-otp')
  @UsePipes(new JoiValidationPipe(getOtpValidation))
  getOtp(@Body() data: GetOtpDto) {
    return this.authService.getOtp(data.mobile);
  }

  @Post('check-otp')
  @UsePipes(new JoiValidationPipe(checkOtpSchema))
  checkOtp(@Body() data: CheckOtpDto) {
    return this.authService.checkOtp(data);
  }
}
