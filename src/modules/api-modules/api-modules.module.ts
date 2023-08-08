import { Module } from '@nestjs/common';

import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [UserModule, AuthModule, AdminAuthModule, SettingsModule],
})
export class ApiModulesModule {}
