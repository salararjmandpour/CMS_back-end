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
import { CreateLabeWithSeoDto, CreateLabelDto } from './dtos/create-label.dto';
import { UpdateLabelDto } from './dtos/update-label.dto';
import { DeleteLabelsDto } from './dtos/delete-label.dto';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';
import { CreateSublabelDto } from './dtos/create-sublabel.dto';
import { DeleteSublabelsDto } from './dtos/delete-labels.dto';
import { ApiCreateLable } from './docs/create-lable.doc';
import { ApiUpdateLable } from './docs/update-lable.doc';
import { ApiDeleteLable } from './docs/delete-lable.doc';
// import { ApiUpdateSublable } from './docs/update-sublable.doc';
// import { ApiDeleteSublable } from './docs/delete-sublable.doc';
// import { ApiCreateSublable } from './docs/create-sublable.doc';

@ApiBearerAuth()
@ApiTags('Labels')
@Controller('labels')
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @ApiCreateLable()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Post()
  createLabel(@Body() body: CreateLabeWithSeoDto) {
    return this.labelsService.createLabel(body);
  }

  @ApiUpdateLable()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Patch(':id')
  updateLabel(@Param('id') id: string, @Body() body: UpdateLabelDto) {
    return this.labelsService.updateLabel(id, body);
  }

  @ApiDeleteLable()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Delete()
  deleteLabels(@Body() body: DeleteLabelsDto) {
    return this.labelsService.deleteLabel(body);
  }

  @Get()
  getPropertiesList() {
    return this.labelsService.findAllLabels();
  }

  // @ApiCreateSublable()
  // @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  // @Post(':id/sublabels')
  // createCharacteristic(
  //   @Param('id') id: string,
  //   @Body() body: CreateSublabelDto,
  // ) {
  //   return this.labelsService.createSublabels(id, body);
  // }

  // @ApiUpdateSublable()
  // @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  // @Put(':labelId/:sublabelId')
  // updateCharacteristic(
  //   @Param('labelId') labelId: string,
  //   @Param('sublabelId') sublabelId: string,
  //   @Body() body: CreateSublabelDto,
  // ) {
  //   return this.labelsService.updateSublabels(labelId, sublabelId, body);
  // }

  // @ApiDeleteSublable()
  // @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  // @Delete(':id/sublabels')
  // deleteManyCharacteristic(
  //   @Param('id') propertyId: string,
  //   @Body() body: DeleteSublabelsDto,
  // ) {
  //   console.log({ propertyId, body });
  //   return this.labelsService.deleteManyCharacteristic(
  //     propertyId,
  //     body.sublabelIDs,
  //   );
  // }
}
