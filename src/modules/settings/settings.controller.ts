import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import * as momentTimezone from 'moment-timezone';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get('pubic-settings')
  getPublicSettigns() {
    const currentTime = momentTimezone().format('YYYY-MM-DD HH:mm:ss');

    return {
      currentTime: currentTime,
    };
  }
}
