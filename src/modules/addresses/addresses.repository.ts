import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionFields } from 'mongoose';

import { CreateAddressDto } from './dtoc/create-address.dto';
import { Address, AddressDocument } from './schemas/address.schema';

@Injectable()
export class AddressesRepository {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  create(data: CreateAddressDto) {
    return this.addressModel.create(data);
  }

  findById(id: string, projection?: ProjectionFields<AddressDocument>) {
    return this.addressModel.findById(id, projection);
  }

  findAll() {
    return this.addressModel.find();
  }
}
