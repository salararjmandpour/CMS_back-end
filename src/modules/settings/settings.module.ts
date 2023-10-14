import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { PublicSettingsRepository } from './repositories/public-settings.repository';
import {
  PublicSettings,
  PublicSettingsSchema,
} from './schemas/public-settings.schema';
import { EmailSettingsRepository } from './repositories/email-settings.repository';
import {
  EmailSettings,
  EmailSettingsSchema,
} from './schemas/email-settings.schema';
import { SmsSettingsRepository } from './repositories/sms-settings.repository';
import { SmsSettings, SmsSettingsSchema } from './schemas/sms-settings.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PublicSettings.name, schema: PublicSettingsSchema },
      { name: EmailSettings.name, schema: EmailSettingsSchema },
      { name: SmsSettings.name, schema: SmsSettingsSchema },
    ]),
  ],
  providers: [
    SettingsService,
    PublicSettingsRepository,
    EmailSettingsRepository,
    SmsSettingsRepository,
  ],
  controllers: [SettingsController],
  exports: [
    SettingsService,
    PublicSettingsRepository,
    EmailSettingsRepository,
    SmsSettingsRepository,
  ],
})
export class SettingsModule {}
