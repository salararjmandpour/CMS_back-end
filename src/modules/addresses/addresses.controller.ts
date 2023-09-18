import { Controller, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AddressesService } from './addresses.service';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';

import { GteAddressListDecorator } from './decorators/get-address-list.decorator';
import { DeleteAddresstDecorator } from './decorators/delete-address.decorator';

@ApiBearerAuth()
@ApiTags('Addresses (UserProfile)')
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @GteAddressListDecorator()
  getAddressList() {
    return this.addressesService.getAddressList();
  }

  @DeleteAddresstDecorator()
  deleteOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.addressesService.deleteById(id);
  }
}
