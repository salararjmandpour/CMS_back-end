import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LabelsService } from './labels.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';
import { CreateLabelDto } from './dtos/create-label.dto';
import { UpdateLabelDto } from './dtos/update-label.dto';

@ApiBearerAuth()
@ApiTags('Labels')
@Controller('labels')
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Post()
  createLabel(@Body() body: CreateLabelDto) {
    return this.labelsService.createLabel(body);
  }

  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Patch(':id')
  updateLabel(@Param('id') id: string, @Body() body: UpdateLabelDto) {
    return this.labelsService.updateLabel(id, body);
  }
}
