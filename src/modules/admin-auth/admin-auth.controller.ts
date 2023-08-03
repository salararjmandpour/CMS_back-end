import { ApiTags } from '@nestjs/swagger';
import { Body, Controller } from '@nestjs/common';

import { LoginAdminDto } from './dtos/login-admin.dto';
import { AdminAuthService } from './admin-auth.service';
import { LoginAdminDecorator } from './decorators/login-admin.decorator';

@ApiTags('Admin Auth')
@Controller('admin-auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @LoginAdminDecorator()
  login(@Body() data: LoginAdminDto) {
    return this.adminAuthService.login(data);
  }
}
