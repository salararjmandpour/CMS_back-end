import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionFields, QueryOptions } from 'mongoose';

import { UpdateAddressDto } from './dtoc/update-address.dto';
import { Address, AddressDocument } from './schemas/address.schema';

@Injectable()
export class AddressesRepository {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  findById(id: string, projection?: ProjectionFields<AddressDocument>) {
    return this.addressModel.findById(id, projection);
  }

  findAll() {
    return this.addressModel.find();
  }

  updateById(
    _id: string,
    data: UpdateAddressDto,
    options?: QueryOptions<Address>,
  ) {
    return this.addressModel.findOneAndUpdate({ _id }, data, options);
  }

  deleteById(_id: string, options?: QueryOptions<Address>): Promise<any> {
    return this.addressModel.deleteOne({ _id }, options);
  }
}
