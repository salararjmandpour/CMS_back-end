// modules
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// services
import { AuthService } from './auth.service';

// validations
import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { getOtpValidation } from './validations/get-otp.validation';
import { checkOtpSchema } from './validations/check-otp.validation';

// dtos
import { GetOtpDto } from './dtos/get-otp.dto';
import { CheckOtpDto } from './dtos/check-otp.dto';

// docs
import { ApiGetOTP } from './docs/get-otp.doc';
import { ApiCheckOTP } from './docs/check-otp.doc';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiGetOTP()
  @Post('get-otp')
  @UsePipes(new JoiValidationPipe(getOtpValidation))
  getOtp(@Body() data: GetOtpDto) {
    return this.authService.getOtp(data.field);
  }

  @ApiCheckOTP()
  @Post('check-otp')
  @UsePipes(new JoiValidationPipe(checkOtpSchema))
  checkOtp(@Body() data: CheckOtpDto) {
    return this.authService.checkOtp(data);
  }
}
