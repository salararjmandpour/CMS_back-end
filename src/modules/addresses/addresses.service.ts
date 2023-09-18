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

  async getAddressList(): Promise<ResponseFormat<any>> {
    const addresses = await this.addressRepository.findAll();
    if (!addresses) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_GET_ADDRESS_LIST,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        addresses,
      },
    };
  }

  async deleteById(id: string): Promise<ResponseFormat<any>> {
    // check exist address
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new NotFoundException(ResponseMessages.ADDRESS_NOT_FOUND);
    }

    // delete address
    const deletedResult = await this.addressRepository.deleteById(id);
    if (deletedResult.deletedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_ADDRESS,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.ADDRESS_DELETED,
    };
  }
}
