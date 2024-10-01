import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';

import {
  PublicSettings,
  PublicSettingsSchema,
} from './schemas/public-settings.schema';
import {
  EmailSettings,
  EmailSettingsSchema,
} from './schemas/email-settings.schema';
import {
  SlugSettings,
  SlugSettingsSchema,
} from './schemas/slug-settings.schema';
import { SmsSettings, SmsSettingsSchema } from './schemas/sms-settings.schema';

import { SmsSettingsRepository } from './repositories/sms-settings.repository';
import { SlugSettingsRepository } from './repositories/slug-settings.repository';
import { EmailSettingsRepository } from './repositories/email-settings.repository';
import { PublicSettingsRepository } from './repositories/public-settings.repository';
import { ReadingSettingsRepository } from './repositories/reading-settings.repository';
import { ReadingSettings, ReadingSettingsSchema } from './schemas/reading-settings.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PublicSettings.name, schema: PublicSettingsSchema },
      { name: EmailSettings.name, schema: EmailSettingsSchema },
      { name: SmsSettings.name, schema: SmsSettingsSchema },
      { name: SlugSettings.name, schema: SlugSettingsSchema },
      { name: ReadingSettings.name, schema: ReadingSettingsSchema },

    ]),
  ],
  providers: [
    SettingsService,
    PublicSettingsRepository,
    EmailSettingsRepository,
    SmsSettingsRepository,
    SlugSettingsRepository,
    ReadingSettingsRepository,
  ],
  controllers: [SettingsController],
  exports: [
    SettingsService,
    PublicSettingsRepository,
    EmailSettingsRepository,
    SmsSettingsRepository,
    ReadingSettingsRepository,
  ],
})
export class SettingsModule {}
