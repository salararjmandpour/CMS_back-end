import { Module } from '@nestjs/common';
import { UserModule } from '../users/users.module';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';

@Module({
  imports: [UserModule],
  providers: [AdminAuthService],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
