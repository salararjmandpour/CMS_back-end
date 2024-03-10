import {
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Controller,
  Get,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LabelsService } from './labels.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { CreateLabelDto } from './dtos/create-label.dto';
import { UpdateLabelDto } from './dtos/update-label.dto';
import { DeleteLabelsDto } from './dtos/delete-label.dto';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';
import { CreateSublabelDto } from './dtos/create-sublabel.dto';
import { DeleteSublabelsDto } from './dtos/delete-labels.dto';

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

  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Delete()
  deleteLabels(@Body() body: DeleteLabelsDto) {
    return this.labelsService.deleteLabel(body);
  }

  @Get()
  getPropertiesList() {
    return this.labelsService.findAllLabels();
  }

  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Post(':id/sublabels')
  createCharacteristic(
    @Param('id') id: string,
    @Body() body: CreateSublabelDto,
  ) {
    return this.labelsService.createSublabels(id, body);
  }

  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Put(':labelId/:sublabelId')
  updateCharacteristic(
    @Param('labelId') labelId: string,
    @Param('sublabelId') sublabelId: string,
    @Body() body: CreateSublabelDto,
  ) {
    console.log(labelId, sublabelId);
    return this.labelsService.updateSublabels(labelId, sublabelId, body);
  }

  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Delete(':id/sublabels')
  deleteManyCharacteristic(
    @Param('id') propertyId: string,
    @Body() body: DeleteSublabelsDto,
  ) {
    console.log({ propertyId, body });
    return this.labelsService.deleteManyCharacteristic(
      propertyId,
      body.sublabelIDs,
    );
  }
}
