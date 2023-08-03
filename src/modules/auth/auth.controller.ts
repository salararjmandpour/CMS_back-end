// modules
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  UsePipes,
} from '@nestjs/common';

// services
import { AuthService } from './auth.service';

// validations
import { JoiValidationPipe } from 'src/core/pipes/joi-validation.pipe';
import { getOtpValidation } from './validations/get-otp.validation';
import { checkOtpValidation } from './validations/check-otp.validation';

// dtos
import { GetOtpDto } from './dtos/get-otp.dto';
import { CheckOtpDto } from './dtos/check-otp.dto';

// docs
import { ApiGetOTP } from './docs/get-otp.doc';
import { ApiCheckOTP } from './docs/check-otp.doc';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ApiRefreshToken } from './docs/refresh-token.doc';
import { refreshTokenValidation } from './validations/refresh-token.validation';

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
  @UsePipes(new JoiValidationPipe(checkOtpValidation))
  checkOtp(@Body() data: CheckOtpDto) {
    return this.authService.checkOtp(data);
  }

  @ApiRefreshToken()
  @Post('refresh-token')
  @UsePipes(new JoiValidationPipe(refreshTokenValidation))
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
