import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';
import { CreateLabelDto } from './dtos/create-label.dto';

@ApiBearerAuth()
@ApiTags('Labels')
@Controller('labels')
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Post()
  createProperties(@Body() body: CreateLabelDto) {
    return this.labelsService.createLabel(body);
  }
}
