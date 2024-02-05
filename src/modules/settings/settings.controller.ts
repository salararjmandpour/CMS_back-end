import { Body, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SettingsService } from './settings.service';

import { SetSmsConfigDto } from './dtos/set-sms-config.dto';
import { SetSlugCnfigDto } from './dtos/set-slug-config.dto';
import { SetEmailConfigDto } from './dtos/set-email-config.dto';
import { SetPublicConfigDto } from './dtos/set-public-config.dto';

import { GetSmsConfigDecorator } from './decorators/get-sms-config.decorator';
import { SetSmsConfigDecorator } from './decorators/set-sms-config.decorator';
import { SetSlugConfigDecorator } from './decorators/set-slug-config.decorator';
import { GetEmailConfigDecorator } from './decorators/get-email-config.decorator';
import { SetEmailConfigDecorator } from './decorators/set-email-config.decorator';
import { SetPublicConfigDecorator } from './decorators/set-public-config.decorator';
import { GetPublicConfigDecorator } from './decorators/get-public-config.decorator';
import { ExcludePublicSettings } from 'src/core/decorators/exclude-public-settings.decorator';

@ApiBearerAuth()
@ApiTags('Settings')
@ExcludePublicSettings()
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
  @GetPublicConfigDecorator()
  getPublicConfig() {
    return this.settingsService.getPublicConfig();
  }

  // set public config (timezone)
  @SetPublicConfigDecorator()
  setPublicConfig(@Body() body: SetPublicConfigDto) {
    return this.settingsService.setPublicConfig(body);
  }

  @SetSlugConfigDecorator()
  setSlugConfig(@Body() body: SetSlugCnfigDto) {
    return this.settingsService.setSlugConfig(body);
  }
}
// { offset: "+03:30", label: "(GMT+03:30) Tehran", tzCode: "Asia/Tehran" },
