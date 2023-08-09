import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from './modules/jwt/jwt.module';
import { SmsModule } from './modules/sms/sms.module';
import { MailModule } from './modules/mail/mail.module';
import { RedisModule } from './modules/redis/redis.module';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminAuthModule } from './modules/admin-auth/admin-auth.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RedisModule,
    JwtModule,
    SmsModule,
    MailModule,
    RedisModule,
    FileModule,
    UserModule,
    AuthModule,
    AdminAuthModule,
    SettingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
