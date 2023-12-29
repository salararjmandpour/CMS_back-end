import { HttpStatus, Injectable } from '@nestjs/common';
import { PropertiesRepository } from './properties.repository';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { CreatePropertyDto } from './dtos/create-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private propertiesRepository: PropertiesRepository) {}


}
