import { ApiTags } from '@nestjs/swagger';
import { Body, Controller } from '@nestjs/common';

import { AdminAuthService } from './admin-auth.service';

import { LoginAdminDto } from './dtos/login-admin.dto';
import { SignupAdminDto } from './dtos/signup-admin.dto';

import { LoginAdminDecorator } from './decorators/login-admin.decorator';
import { SignupAdminDecorator } from './decorators/signup-admin.decorator';

@ApiTags('Admin Auth')
@Controller('admin-auth')
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
}
