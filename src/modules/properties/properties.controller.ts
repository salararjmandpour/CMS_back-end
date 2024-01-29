import {
  Put,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { DeletePropertiesDto } from './dtos/delete-property.dto';
import { ApiUpdateProperty } from './docs/update-property.doc';
import { ApiCreateProperty } from './docs/create-property.doc';
import { ApiDeleteProperties } from './docs/delete-property.doc';
import { ApiFindProperties } from './docs/find-property.doc';
import { CreateCharacteristicDto } from './dtos/create-characteristic.dto';
import { ApiCreateCharacteristic } from './docs/create-characteristic.doc';
import { ApiUpdateCharacteristic } from './docs/update-characteristic.doc';
import { DeleteCharacteristicDto } from './dtos/delete-characteristic.dto';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

@ApiBearerAuth()
@ApiTags('Properties')
@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @ApiCreateProperty()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Post()
  createProperties(@Body() body: CreatePropertyDto) {
    return this.propertiesService.createProperty(body);
  }

  @ApiUpdateProperty()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Patch(':id')
  updateProperties(@Param('id') id: string, @Body() body: UpdatePropertyDto) {
    return this.propertiesService.updateProperty(id, body);
  }

  @ApiDeleteProperties()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Delete()
  deleteProperties(@Body() body: DeletePropertiesDto) {
    return this.propertiesService.deleteProperties(body);
  }

  @ApiFindProperties()
  @UseGuards(AuthGuard)
  @Get()
  getPropertiesList() {
    return this.propertiesService.findAllProperties();
  }

  @ApiCreateCharacteristic()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Post(':id/characteristic')
  createCharacteristic(
    @Param('id') id: string,
    @Body() body: CreateCharacteristicDto,
  ) {
    return this.propertiesService.createCharacteristic(id, body);
  }

  @ApiUpdateCharacteristic()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Put(':propertyId/:characteristicId')
  updateCharacteristic(
    @Param('propertyId') propertyId: string,
    @Param('characteristicId') characteristicId: string,
    @Body() body: CreateCharacteristicDto,
  ) {
    return this.propertiesService.updateCharacteristic(
      propertyId,
      characteristicId,
      body,
    );
  }

  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Delete(':id/characteristic')
  deleteManyCharacteristic(
    @Param('id') propertyId: string,
    @Body() body: DeleteCharacteristicDto,
  ) {
    return this.propertiesService.deleteManyCharacteristic(
      propertyId,
      body.characteristicIDs,
    );
  }
}
