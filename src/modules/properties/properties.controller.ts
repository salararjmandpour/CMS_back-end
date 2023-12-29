import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCreateProperty } from './docs/create-property.doc';
import { AuthGuard } from 'src/core/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Properties')
@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @ApiCreateProperty()
  @UseGuards(AuthGuard)
  @Get()
  createProperties(@Body() body: CreatePropertyDto) {
    return this.propertiesService.createProperty(body);
  }
}
