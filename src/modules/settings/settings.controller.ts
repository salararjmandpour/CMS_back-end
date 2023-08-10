import { ApiTags } from '@nestjs/swagger';
import * as momentTimezone from 'moment-timezone';
import { Body, Controller, Get } from '@nestjs/common';

import { SettingsService } from './settings.service';

import { SetSmsConfigDto } from './dtos/set-sms-config.dto';
import { SetEmailConfigDto } from './dtos/set-email-config.dto';

import { GetSmsConfigDecorator } from './decorators/get-sms-config.decorator';
import { SetSmsConfigDecorator } from './decorators/set-sms-config.decorator';
import { GetEmailConfigDecorator } from './decorators/get-email-config.decorator';
import { SetEmailConfigDecorator } from './decorators/set-email-config.decorator';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  // get email config
  @GetEmailConfigDecorator()
  getEmailConfig() {
    return this.settingsService.getEmailConfig();
  }

  // set email config
  @SetEmailConfigDecorator()
  setEmailConfig(@Body() data: SetEmailConfigDto) {
    return this.settingsService.setEmailConfig(data);
  }

  // set sms config
  @SetSmsConfigDecorator()
  setSmsConfig(@Body() data: SetSmsConfigDto) {
    return this.settingsService.setSmsConfig(data);
  }

  // get sms config
  @GetSmsConfigDecorator()
  getSmsConfig() {
    return this.settingsService.getSmsConfig();
  }

  // get public config (date and time)
  @Get('/pubic/get-config')
  getPublicSettigns() {
    const currentTime = momentTimezone().format('YYYY-MM-DD HH:mm:ss');

    return {
      currentTime: currentTime,
    };
  }
}
