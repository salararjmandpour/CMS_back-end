import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { GteAddressListDecorator } from './decorators/get-address-list.decorator';

@ApiBearerAuth()
@ApiTags('Addresses (UserProfile)')
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @GteAddressListDecorator()
  getAddressList() {
    return this.addressesService.getAddressList();
  }
}
