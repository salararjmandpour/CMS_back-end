import {
  HttpStatus,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { AddressesRepository } from './addresses.repository';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class AddressesService {
  constructor(private addressRepository: AddressesRepository) {}




}
