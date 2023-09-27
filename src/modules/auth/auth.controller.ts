import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Query, Req } from '@nestjs/common';

import { AuthService } from './auth.service';

import { GetOtpDto } from './dtos/get-otp.dto';
import { CheckOtpDto } from './dtos/check-otp.dto';

import { ApiLogout } from './docs/logout.doc';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

import { GetOtpDecorator } from './decorators/get-otp-decorator';
import { CheckOtpDecorator } from './decorators/check-otp.decorator';
import { GoogleLoginDecorator } from './decorators/google-login.decorator';
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

  @ApiLogout()
  @Get('logout')
  logout(@Req() req: Request) {
    const accessToken = req.headers?.accessToken as string;
    const refreshToken = req.headers?.refreshToken as string;

    return this.authService.logout(accessToken, refreshToken);
  }

  // login with google
  @GoogleLoginDecorator()
  googleLogin(@Query('code') code: string) {
    return this.authService.googleOAuth(code);
  }
}
