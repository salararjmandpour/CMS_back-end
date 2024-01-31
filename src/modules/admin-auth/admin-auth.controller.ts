import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Query, Res } from '@nestjs/common';

import { AdminAuthService } from './admin-auth.service';

import { LoginAdminDto } from './dtos/login-admin.dto';
import { SignupAdminDto } from './dtos/signup-admin.dto';

import { LoginAdminDecorator } from './decorators/login-admin.decorator';
import { SignupAdminDecorator } from './decorators/signup-admin.decorator';
import { ForgotPasswordDecorator } from './decorators/forgot-password.decorator';
import {
  ForgotPasswordDto,
  PostResetPasswordDto,
} from './dtos/forgot-password.dto';
import { PostResetPasswordDecorator } from './decorators/post-reset-password.decorator';
import { ExcludePublicSettings } from 'src/core/decorators/exclude-public-settings.decorator';

@ApiTags('Admin Auth')
@Controller('admin-auth')
@ExcludePublicSettings()
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @LoginAdminDecorator()
  login(@Body() data: LoginAdminDto) {
    return this.adminAuthService.login(data);
  }

  @SignupAdminDecorator()
  signup(@Body() data: SignupAdminDto) {
    return this.adminAuthService.signup(data);
  }

  @ForgotPasswordDecorator()
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.adminAuthService.forgotPassword(body.email);
  }

  @Get('reset-password')
  getResetPassword(@Query('token') token: string, @Res() res: Response) {
    return this.adminAuthService.getResetPassword(res, token);
  }

  @PostResetPasswordDecorator()
  async postResetPassword(@Body() body: PostResetPasswordDto) {
    return this.adminAuthService.postResetPassword(body);
  }
}
