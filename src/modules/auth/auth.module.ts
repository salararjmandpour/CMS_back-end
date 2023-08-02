import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SmsModule } from '../sms/sms.module';
import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../users/schema/user.schema';
import { MailModule } from '../mail/mail.module';
import { OAuth2Client } from 'google-auth-library';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => SmsModule),
    forwardRef(() => MailModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, OAuth2Client],
  exports: [AuthService],
})
export class AuthModule {}
