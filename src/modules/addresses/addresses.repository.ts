import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionFields, QueryOptions } from 'mongoose';
import { Address, AddressDocument } from './schemas/address.schema';

@Injectable()
export class AddressesRepository {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  findById(id: string, projection?: ProjectionFields<AddressDocument>) {
    return this.addressModel.findById(id, projection);
  }


}
