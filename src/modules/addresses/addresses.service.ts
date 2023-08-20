import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';
import { CreateAddressDto } from './dtoc/create-address.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { UpdateAddressDto } from './dtoc/update-address.dto';

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
}
