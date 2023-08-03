// modules
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// services
import { AuthService } from './auth.service';

// validators
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { getOtpValidator } from './validators/get-otp.validator';
import { checkOtpValidator } from './validators/check-otp.validator';

// dtos
import { GetOtpDto } from './dtos/get-otp.dto';
import { CheckOtpDto } from './dtos/check-otp.dto';

// docs
import { ApiGetOTP } from './docs/get-otp.doc';
import { ApiCheckOTP } from './docs/check-otp.doc';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ApiRefreshToken } from './docs/refresh-token.doc';
import { refreshTokenValidator } from './validators/refresh-token.validator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiGetOTP()
  @Post('get-otp')
  @UsePipes(new JoiValidatorPipe(getOtpValidator))
  getOtp(@Body() data: GetOtpDto) {
    return this.authService.getOtp(data.field);
  }

  @ApiCheckOTP()
  @Post('check-otp')
  @UsePipes(new JoiValidatorPipe(checkOtpValidator))
  checkOtp(@Body() data: CheckOtpDto) {
    return this.authService.checkOtp(data);
  }

  @ApiRefreshToken()
  @Post('refresh-token')
  @UsePipes(new JoiValidatorPipe(refreshTokenValidator))
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
