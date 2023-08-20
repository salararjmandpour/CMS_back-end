import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { AddressesRepository } from './addresses.repository';
import { CreateAddressDto } from './dtoc/create-address.dto';
import { UpdateAddressDto } from './dtoc/update-address.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

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

  async update(
    id: string,
    body: UpdateAddressDto,
  ): Promise<ResponseFormat<any>> {
    const updatedResult = await this.addressRepository.updateById(id, body, {
      new: true,
    });
    if (!updatedResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_ADDRESS,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        address: updatedResult,
      },
    };
  }

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
