import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { SmsSettings, SmsSettingsSchema } from './schemas/sms-settings.schema';
import { SmsRepository } from './sms.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SmsSettings.name, schema: SmsSettingsSchema },
    ]),
    HttpModule,
  ],
  providers: [SmsService, SmsRepository],
  exports: [SmsService],
  controllers: [SmsController],
})
export class SmsModule {}
