import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get } from '@nestjs/common';

import { SettingsService } from './settings.service';

import { SetSmsConfigDto } from './dtos/set-sms-config.dto';
import { SetEmailConfigDto } from './dtos/set-email-config.dto';

import { GetSmsConfigDecorator } from './decorators/get-sms-config.decorator';
import { SetSmsConfigDecorator } from './decorators/set-sms-config.decorator';
import { GetEmailConfigDecorator } from './decorators/get-email-config.decorator';
import { SetEmailConfigDecorator } from './decorators/set-email-config.decorator';
import { SetPublicConfigDto } from './dtos/set-public-config.dto';
import { SetPublicConfigDecorator } from './decorators/set-public-config.decorator';

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

  // get public config (timezone)
  @Get('/public/get-config')
  getPublicConfig() {
    return this.settingsService.getPublicConfig();
  }

  // set public config (timezone)
  @SetPublicConfigDecorator()
  setPublicConfig(@Body() body: SetPublicConfigDto) {
    return this.settingsService.setPublicConfig(body);
  }
}
