import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { Address, AddressSchema } from './schemas/address.schema';
import { AddressesRepository } from './addresses.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  providers: [AddressesService, AddressesRepository],
  controllers: [AddressesController],
})
export class AddressesModule {}
