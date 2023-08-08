import { ApiTags } from '@nestjs/swagger';
import { Body, Controller } from '@nestjs/common';

import { MailService } from './mail.service';
import { SetConfigDto } from './dto/set-config.dto';

import { SetConfigDecorator } from './decorators/set-config.decorator';
import { GetConfigDecorator } from './decorators/get-config.decorator';

@ApiTags('Settings')
@Controller('email')
export class MailController {
  constructor(private mailService: MailService) {}

  @SetConfigDecorator()
  setConfig(@Body() data: SetConfigDto) {
    return this.mailService.setConfig(data);
  }

  @GetConfigDecorator()
  getSmsConfig() {
    return this.mailService.getConfig();
  }
}
