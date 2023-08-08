import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SmsService } from './sms.service';
import { SetConfigDto } from './dto/set-config.dto';
import { SetConfigDecorator } from './decorators/set-config.decorator';
import { GetConfigDecorator } from './decorators/get-config.decorator';

@ApiTags('Settings')
@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}

  @SetConfigDecorator()
  setSmsConfig(@Body() data: SetConfigDto) {
    return this.smsService.setConfig(data);
  }

  @GetConfigDecorator()
  getSmsConfig() {
    return this.smsService.getConfig();
  }
}
