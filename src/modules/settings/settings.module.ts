import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { SettingsRepository } from './settings.repository';
import { PublicSettings } from './schemas/public-settings.schema';
import { UserSchema } from '../users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PublicSettings.name, schema: UserSchema },
    ]),
  ],
  providers: [SettingsService, SettingsRepository],
  controllers: [SettingsController],
})
export class SettingsModule {}
