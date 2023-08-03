import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from './modules/jwt/jwt.module';
import { SmsModule } from './modules/sms/sms.module';
import { MailModule } from './modules/mail/mail.module';
import { RedisModule } from './modules/redis/redis.module';
import { ApiModulesModule } from './modules/api-modules/api-modules.module';

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
    ApiModulesModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
