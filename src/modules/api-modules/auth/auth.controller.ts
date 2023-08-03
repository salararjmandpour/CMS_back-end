// modules
import { Body, Controller, Get, Query, Redirect } from '@nestjs/common';
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

  @Get('google/get-url')
  @Redirect()
  async googleAuth() {
    const authUrl = await this.authService.getGoogleAuthUrl();
    return { url: authUrl };
  }

  @Get('google/callback')
  @Redirect('http://localhost:3000/success')
  async googleAuthCallback(@Query('code') code: string) {
    const accessToken = await this.authService.getGoogleAccessToken(code);
    return { token: accessToken };
  }
}
