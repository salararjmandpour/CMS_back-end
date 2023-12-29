import { Body, Controller, Get } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dtos/create-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

}
