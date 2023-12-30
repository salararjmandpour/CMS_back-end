import {
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { ApiCreateProperty } from './docs/create-property.doc';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { ApiUpdateProperty } from './docs/update-property.doc';

@ApiBearerAuth()
@ApiTags('Properties')
@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @ApiCreateProperty()
  @UseGuards(AuthGuard)
  @Post()
  createProperties(@Body() body: CreatePropertyDto) {
    return this.propertiesService.createProperty(body);
  }

  @ApiUpdateProperty()
  @UseGuards(AuthGuard)
  @Patch(':id')
  updateProperties(@Param('id') id: string, @Body() body: UpdatePropertyDto) {
    return this.propertiesService.updateProperty(id, body);
  }
}
