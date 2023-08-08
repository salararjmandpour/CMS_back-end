// modules
import { Body, Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// services
import { AuthService } from './auth.service';

// dtos
import { GetOtpDto } from './dtos/get-otp.dto';
import { CheckOtpDto } from './dtos/check-otp.dto';

// docs
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { GetOtpDecorator } from './decorators/get-otp-decorator';
import { CheckOtpDecorator } from './decorators/check-otp.decorator';
import { RefreshTokenDecorator } from './decorators/refresh-token.decorator';
import { GoogleLoginDecorator } from './decorators/google-login.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @GetOtpDecorator()
  getOtp(@Body() data: GetOtpDto) {
    return this.authService.getOtp(data.field);
  }

  @CheckOtpDecorator()
  checkOtp(@Body() data: CheckOtpDto) {
    return this.authService.checkOtp(data);
  }

  @RefreshTokenDecorator()
  refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken);
  }

  // login with google
  @GoogleLoginDecorator()
  googleLogin(@Query('code') code: string) {
    console.log({ code });
    return this.authService.googleOAuth(code);
  }
}
