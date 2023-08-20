import { HttpStatus, Injectable } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';
import { CreateAddressDto } from './dtoc/create-address.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';

@Injectable()
export class AddressesService {
  constructor(private addressRepository: AddressesRepository) {}

  async create(body: CreateAddressDto): Promise<ResponseFormat<any>> {
    const createdResult = await this.addressRepository.create(body);

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        address: createdResult,
      },
    };
  }
}
