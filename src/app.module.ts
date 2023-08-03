import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { SmsModule } from './modules/sms/sms.module';
import { MailModule } from './modules/mail/mail.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { ApiModulesModule } from './modules/api-modules/api-modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL,
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    JwtModule,
    SmsModule,
    MailModule,
    ApiModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
